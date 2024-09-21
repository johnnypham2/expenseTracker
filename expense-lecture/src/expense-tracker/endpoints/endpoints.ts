import { TExpense } from "../components/ExpensePage";
import { ILogin, IRegister } from "../../interfaces/interface";

const URL = "http://localhost:5083/Expense/"
const expenseURL = "https://expenseapi-adcke9h4dtcghac5.westus-01.azurewebsites.net/";

export async function GetAllExpenses()
{
    let promise = await fetch(`${URL}GetAllExpense`);
    let response = await promise.json();
    return response
}

export async function CreateExpenses(newExpense: TExpense)
 {
    let res= await fetch(`${URL}CreateExpense`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
    });
    let data = await res.json();
   return data;

}

export async function EditExpense( editExpense: TExpense)
{
    let res= await fetch(`${URL}EditExpense?id=${editExpense.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editExpense)
    });
    let data = await res.json();
   return data;
}


export async function DeleteExpense(id: number)
{
    let res= await fetch(`${URL}DeleteExpense?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
    let data = await res.json();
   return data;
}

export const Login = async (loginData: ILogin) => {
    const res = await fetch(expenseURL + 'User/Login', {
        method: 'POST',
        headers : {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    const data = await res.json();
    console.log(data);
    return data;
}

export const Register = async (registerData: IRegister) => {
    const res = await fetch(expenseURL + 'User/AddUsers', {
        method: 'POST',
        headers : {
            "Content-Type": "application/json"
       },
       body: JSON.stringify(registerData)
    })

    const data = await res.json();
    console.log(data);
    return data;
}