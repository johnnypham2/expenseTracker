const URL = "https://expenseapi-adcke9h4dtcghac5.westus-01.azurewebsites.net/expense/"
export async function GetAllExpenses()
{
    let promise = await fetch(`${URL}GetAllExpense`);
    let response = await promise.json();
    return response
}