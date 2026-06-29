import fs from 'fs'

// 1.
// fs.writeFile("data/message.txt", JSON.stringify("Hello from Node fs!"), (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//     console.log("File was created successfully")}
// })

// 2.
// fs.readFile("data/message.txt", "utf8", (err, data) => {
//     console.log(data)
// })

// 3.
// function asyncTest() {
//     console.log("start");
//     fs.readFile("data/message.txt", "utf8", (err, data) => {
//         if (err) {console.log(err)
//         } else {console.log(data)}
//     })
//     console.log("end");
// }

// asyncTest()

// 4.
// function notExists() {
//     console.log("start")
//     fs.readFile("data/not-exists.txt", "utf8", (err, data) => {
//         if (err) console.log("Could not read file" ,err)
//     })
//     console.log("end")
// }
// notExists()

// 5.
// function readTextFile(filePath, callBack) {
//     fs.readFile(filePath, "utf8" , callBack)
// }

// readTextFile("data/message.txt", function(err, data) {
//     if (err) {console.log(err)}
//         else {console.log(data)}
//     })

// 6.
// fs.appendFile('data/message.txt', "\n" + JSON.stringify('This line was added later'), (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//     fs.readFile('data/message.txt', 'utf8', (err, data) => {
//         if (err) console.log(err)
//             console.log(data)})}
//     })

// 7.
// fs.writeFile("data/log.txt", JSON.stringify("Log started"), (err) => {
//     if (err) console.log(err)
//         fs.appendFile("data/log.txt","\n" + JSON.stringify("First action completed"), (err) => {
//     if (err) console.log(err)
//          fs.appendFile("data/log.txt","\n" + JSON.stringify("Second action completed"), (err) => {
//     if (err) console.log(err)
//     fs.readFile("data/log.txt", "utf8", (err, data) => {
//     if (err) console.log(err)
//     else{console.log(data)}
// })})})})

// 8.
// fs.mkdir("data/users", {recursive: true}, (err, path) => {
//     if (path) {
//         console.log("Users folder created")
//     } else {
//         console.log("Users folder already exists")
//     }
// })

// 9.
// fs.mkdir("data/users", {recursive: true}, (err,) => {
//     if (err) console.log("folder exists")
// })
// const text = 
// fs.writeFile("data/users/user1.txt", JSON.stringify("Name: David") + "\n" + JSON.stringify("Age: 25"), {recursive: true}, (err) => {
//     if (err) {
//         console.log("succssesfully")
//     }
// })

// 10.
// fs.readdir("data", (err, data) => {
//     if (err) {console.log(err)}
//     else {console.log(data)}
// })

// 11.
// fs.writeFile("data/step1.txt", JSON.stringify("Step 1 completed"), (err) => {
//     if (err) {console.log(err)}
//     fs.writeFile("data/step2.txt", JSON.stringify("Step 2 completed"), (err) => {
//         if (err) {console.log(err)}
//         fs.writeFile("data/step3.txt", JSON.stringify("Step 3 completed"), (err) => {
//             if (err) {console.log(err)}
//             else {console.log("All steps completed")}
// })})})

12.
fs.readFile("data/step1.txt", "utf8", (err, data) => {
    if (err) return console.log(err)
        const data1 = data
        fs.readFile("data/step2.txt", "utf8", (err, data) => {
            if (err) return console.log(err)
                const data2 = data
                fs.readFile("data/step3.txt", "utf8", (err, data) => {
                    if (err) return console.log(err)
                        const data3 = data
                        console.log(data1, "\n" + data2, "\n" + data3)
             })
        })
    })

13.
fs.writeFile("data/report-title.txt","Daily report",(err) =>{
    if (err) return console.log(err)
    fs.writeFile("data/report-body.txt", "Everything is working",(err) =>{
        if(err) return console.log(err)
        fs.readFile("data/report-title.txt","utf-8",(err,data) =>{
        if (err) return console.log(err)
        const oneData = data
            fs.readFile("data/report-body.txt","utf-8",(err,data) =>{
                if (err) return console.log(err)
                const dataTwo = data
                const addData = oneData + "\n" + dataTwo
                  fs.writeFile("data/final-report.txt",addData,(err) =>{
                    if(err) return console.log(err)
                    console.log(addData)
                  })
            })})})
})

14.
fs.writeFile("data/original.txt","Original file content",(err) =>{
    if (err) return console.log(err)
    fs.readFile("data/original.txt","utf-8",(err,data) =>{
        if(err) return console.log(err)
        const saveData = data
        fs.writeFile("data/copy.txt", saveData,(err) =>{
            if(err) return console.log(err)
            fs.readFile("data/copy.txt","utf-8",(err,data) =>{
                if(err) return console.log(err)
                console.log(data)})
        })})
})