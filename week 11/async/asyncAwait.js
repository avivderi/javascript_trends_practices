import fs from 'fs/promises'

// 5.
// const getUrl = await fetch("https://jsonplaceholder.typicode.com/todos/1")
// const data = await getUrl.json()
// console.log(data)

6.
async function returnDone() {
    return "done"
}

7.
async function returnSquear(num) {
    return num**2
}

14.
async function towApi() {
    try {
    const api1 = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const api2 = await fetch("https://jsonplaceholder.typicode.com/todos/2")
        if (!api1.ok || !api2.ok) {
            throw new Error("somthing warng")
        }
    const data1 = await api1.json()
    const data2 = await api2.json()
    console.log(data1, "\n", data2)
    }
    catch (err) {
        console.log(err.message)
    }
}

15 + 16.
async function threeApi() {
    try {
        const promise1 = fetch("https://jsonplaceholder.typicode.com/todos/1");
        const promise2 = fetch("https://jsonplaceholder.typicode.com/todos/2");
        const promise3 = fetch("https://jsonplaceholder.typicode.com/todos/3");

        const responses = await Promise.all([promise1, promise2, promise3]);
        
        if (!responses[0].ok || !responses[1].ok || !responses[2].ok) {
            throw new Error("Something went wrong with the network response");
        }

        const jsonPromise1 = responses[0].json();
        const jsonPromise2 = responses[1].json();
        const jsonPromise3 = responses[2].json();

        const allJSON = await Promise.all([jsonPromise1, jsonPromise2, jsonPromise3]);

        console.log(allJSON);
        
    } catch (err) {
        console.log(err.message);
    }
}

18.
async function loop() {
    const arr = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/3"
    ]

    let arrJSON = []

    for (let i of arr) {
        const responce = await fetch(i)
        if (!responce.ok) {
            throw new Error("somthing warng")
        }
        const data = await responce.json()

        arrJSON.push(data)
    }
    return arrJSON
}

19.
async function getAll() {
    const arr = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/todos/3"
    ]

    const responce = await Promise.all([fetch(arr[0]), fetch(arr[1]), fetch(arr[2])])
    if (!responce[0].ok || !responce[1].ok || !responce[2].ok) {
        throw new Error("somthing warng")
    }
    const data1 = await responce[0].json()
    const data2 = await responce[1].json()
    const data3 = await responce[2].json()

    const arrJSON = [data1, data2, data3]
    return arrJSON
}


console.log(await getAll())