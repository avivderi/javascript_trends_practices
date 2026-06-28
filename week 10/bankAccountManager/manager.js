export let allCustomers = []
let id = 1

export function createCustomer(fullName, accountType, balance) {
    if (!fullName || fullName.trim() === "") return "Name cannot be empty"
    if (isNaN(balance) || balance < 0) return "Balance must be a positive number"
    
    const validTypes = ["Regular", "Premium", "Student"]
    if (!validTypes.includes(accountType)) return "Invalid account type"

    allCustomers.push({id, fullName: fullName.trim(), accountType, balance: Number(balance), isActive: true})
    id++
    return "Customer created successfully"
}

export function showCustomers() {
    console.table(allCustomers)
}

export function deposit(customerId, amount) {
    const findId = allCustomers.find(obj => obj.id === customerId)
    if (findId) {
        if (findId.isActive === true) {
            if (amount > 0) {
                findId.balance += amount
                return "Deposit completed successfully"
            } 
            return "amount must be positive"
        } 
        return "id not activate" 
    } 
    return "id not found"
}

export function withdraw(customerId, amount) {
    const findId = allCustomers.find(obj => obj.id === customerId)
    if (findId) {
        if (findId.isActive === true) {
            if (amount > 0) {
                if (findId.balance >= amount) {
                    findId.balance -= amount
                    return "Withdraw completed successfully"
                } 
                return "Withdraw failed: insufficient balance"
            } 
            return "amount must be positive"
        } 
        return "id not activate" 
    } 
    return "id not found"
} 

export function searchCustomers(searchItem) {
    const clean = searchItem.toString().trim().toLowerCase()
    const found = allCustomers.find(obj => 
        obj.id.toString() === clean || obj.fullName.toLowerCase() === clean
    )
    return found ? found : "Customer not found"
}

export function closeAccount(customerId) {
    const findId = allCustomers.find(obj => obj.id === customerId)
    if (findId) {
        findId.isActive = false
        return "Account closed successfully"
    }
    return "id not found"
}

export function showStatistics() {
    const totalCustomers = allCustomers.length
    if (totalCustomers === 0) {
        console.log("No customers in the system.")
        return
    }

    const activeAccounts = allCustomers.filter(obj => obj.isActive === true).length
    const totalMoney = allCustomers.reduce((acc, current) => acc + current.balance, 0)
    const averageBalance = totalMoney / totalCustomers
    const balancesArray = allCustomers.map(obj => obj.balance)
    const highestBalance = Math.max(...balancesArray)

    console.log("===== Statistics =====")
    console.log(`Total Customers: ${totalCustomers}`)
    console.log(`Active Accounts: ${activeAccounts}`)
    console.log(`Total Money: ${totalMoney}`)
    console.log(`Average Balance: ${averageBalance}`)
    console.log(`Highest Balance: ${highestBalance}`)
}