import readline from "readline"
import { stdin as input, stdout as output } from "process"
import { createCustomer, showCustomers, deposit, withdraw, searchCustomers, closeAccount, showStatistics } from "./manager.js"

const rl = readline.createInterface({ input, output })

function showMenu() {
    console.log("\n===== BANK MENU =====")
    console.log("1. Create Customer")
    console.log("2. Show Customers")
    console.log("3. Deposit")
    console.log("4. Withdraw")
    console.log("5. Search Customer")
    console.log("6. Close Account")
    console.log("7. Show Statistics")
    console.log("8. Exit")
    
    rl.question("\nChoose an option (1-8): ", main)
}

function main(choice) {
    switch (choice.trim()) {
        case "1":
            rl.question("Enter full name: ", (name) => {
                rl.question("Enter account type (Regular, Premium, Student): ", (type) => {
                    rl.question("Enter initial balance: ", (balance) => {
                        const createResult = createCustomer(name, type, Number(balance))
                        console.log(createResult)
                        showMenu()
                    })
                })
            })
            break

        case "2":
            showCustomers()
            showMenu()
            break

        case "3":
            rl.question("Enter customer ID: ", (depositId) => {
                rl.question("Enter amount to deposit: ", (depositAmount) => {
                    const depositResult = deposit(Number(depositId), Number(depositAmount))
                    console.log(depositResult)
                    showMenu()
                })
            })
            break

        case "4":
            rl.question("Enter customer ID: ", (withdrawId) => {
                rl.question("Enter amount to withdraw: ", (withdrawAmount) => {
                    const withdrawResult = withdraw(Number(withdrawId), Number(withdrawAmount))
                    console.log(withdrawResult)
                    showMenu()
                })
            })
            break

        case "5":
            rl.question("Enter customer ID or Name: ", (searchItem) => {
                const searchResult = searchCustomers(searchItem)
                console.log(searchResult)
                showMenu()
            })
            break

        case "6":
            rl.question("Enter customer ID to close: ", (closeId) => {
                const closeResult = closeAccount(Number(closeId))
                console.log(closeResult)
                showMenu()
            })
            break

        case "7":
            showStatistics()
            showMenu()
            break

        case "8":
            console.log("Goodbye!")
            rl.close()
            break

        default:
            console.log("Invalid option, please try again")
            showMenu()
    }
}

showMenu()