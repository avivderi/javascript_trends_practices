import input from "analiza-sync";
import { isValidName,isValidBalance,isValidId,isValidTypeAcount, checkAmount } from "./utils.js";
import { createCustomer,showCustomer,Deposit,Withdraw,SearchCustomer,CloseAccount,showStatistics } from "./manager.js";

function menu(){
    console.log("===== Menu =====")
    console.log("to create customer press:1")
    console.log("to show customer press:2")
    console.log("to deposit press:3")
    console.log("to withdraw press:4")
    console.log("to search customer press:5")
    console.log("to close acount press:6")
    console.log("to show statistics press:7")
    console.log("to Exit press:8")
    const choice = Number(input("press your choice "))
    return choice
}

function main(){
    let choice = 0
    while(choice !== 8){
        choice = menu()
        switch(choice){
            case 1:{
                let validName = false
                let fullname
                while(!validName){
                    fullname = input("Enter your fullname ")
                    validName = isValidName(fullname)
                }
                let validTypeAcount = false
                let accountType 
                while(!validTypeAcount){
                    accountType = input ("Enter your type account ")
                    validTypeAcount = isValidTypeAcount(accountType)
                }
                let balance
                let validBalance = false
                while(!validBalance){
                    balance = Number(input("Enter your balance "))
                    validBalance = isValidBalance(balance)
                }
                const customer = createCustomer(fullname,accountType,balance)
                console.log(customer())
                break
            }
            case 2:{
                console.table(showCustomer())
                break
            }
            case 3:{
                let customerId
                let validCustomerId = false
                while(!validCustomerId){
                    customerId = Number(input("Enter customer id "))
                    validCustomerId = isValidId(customerId)
                }
                let amount
                let validAmount = false
                while(!validAmount){
                    amount= Number(input("Enter your amount "))
                    validAmount = checkAmount(amount)
                }
                console.log(Deposit(customerId,amount))
                break
            }
            case 4:{
                let customerId
                let validCustomerId = false
                while(!validCustomerId){
                    customerId = Number(input("Enter customer id "))
                    validCustomerId = isValidId(customerId)
                }
                let amount
                let validAmount = false
                while(!validAmount){
                    amount= Number(input("Enter your amount "))
                    validAmount = checkAmount(amount)
                }
                console.log(Withdraw(customerId,amount))
                break
            }
            case 5:{
                let customerId
                let fullname
                let validName = false
                let validCustomerId = false
                while(!validCustomerId && !validName){
                    customerId = Number(input("Enter customer id "))
                    fullname = input("Enter your name ")
                    validCustomerId = isValidId(customerId)
                    validName = isValidName(fullname)
                }
                console.log(SearchCustomer(customerId,fullname))
                break
            }
            case 6:{
                let customerId
                let validCustomerId = false
                while(!validCustomerId){
                    customerId = Number(input("Enter customer id "))
                    validCustomerId = isValidId(customerId)
                }
                console.log(CloseAccount(customerId))
                break
            }
            case 7:{
                const customer =showStatistics()
                console.log(`Total Customers: ${customer.totalCustomer}`) 
                console.log(`Active Accounts: ${customer.activeAcount}`)
                console.log(`Total Money: ${customer.totalMoney}`)
                console.log(`Average Balance: ${customer.AverageBalance}`)
                console.log(`Highest Balance: ${customer.HigestBalance}`)
                break
            }
            default:{
                console.log("choice not correct")
                break
            }








    }}
    return " you can't mannager the bank account "

}
console.log(main())