import fs from 'fs'

// 1.
// function writeFileAsPromise(filePath, content) {
//     return new Promise((res, rej) => {
//         fs.writeFile(filePath, content, (err) => {
//             if (err) rej(err)
//             res("succsses to writefile")
//         })
//     })
// }
// writeFileAsPromise("data/message.txt", "i heat promises")
// .then((res) => console.log(res))
// .catch((rej) => console.log(rej))

// 2.
// function readFileAsPromise(filePath) {
//     return new Promise((res,rej) => {
//         fs.readFile(filePath, "utf8", (err, data) => {
//             if (err) rej(err)
//             res(data)
//         })

//     })
// }
// readFileAsPromise("data/message.txt")
// .then((res) => console.log(res))
// .catch((rej) => console.log(rej))

// 3.
// function readFileAndCount(filePath) {
//     return new Promise((res, rej) => {
//         fs.readFile(filePath, "utf8", (err, data) => {
//             if (err) rej(err)
//             let con = 0
//             for (let i of data) {
//                 con++
//             } res(con)
//         })
//     })
// }
// readFileAndCount("data/message.txt")
// .then((res) => console.log(res))
// .catch((rej) => console.log(rej))

// 4.
// function appendFileAsPromise(filePath, content) {
//     return new Promise((res, rej) => {
//         fs.writeFile(filePath, content, (err) => {
//             if (err) rej(err)
//                 res("succssesfully")
//         })
//     })
// }
// appendFileAsPromise("data/step1.txt"," ")
// .then((res) => {
//     console.log("Step 1 done");
//     return appendFileAsPromise("data/step2.txt"," ")
// })
// .then((res) => console.log("Step 2 done"))
// .catch((rej) => console.log(rej))

5.
let allFile = []
function callFile(filePath){
    return new Promise((res,rej) =>{
        fs.readFile(filePath,"utf-8",(err,data) => {
            if (err) rej(err)
            allFile.push(data)
            res(allFile)
        })
    })
}
callFile("../../callbacks-fs-practice/data/step1.txt")
.then((data) => callFile("../../callbacks-fs-practice/data/step2.txt"))
.then((data) => callFile("../../callbacks-fs-practice/data/step3.txt"))
.then((data) => console.table(data))
.catch((err) => console.log(err))

6.
function readFiles(filePath){
    return new Promise((res,rej) => {
        fs.readFile(filePath,"utf-8",(err,data) =>{
            if (err) rej(err)
            res(data)
        })


    }
)
}
function writetoFile(filePath,content){
    return new Promise((res,rej) => {
        fs.writeFile(filePath,content,(err) => {
            if (err) rej(err)
            res(content)
        })
    }
)
}
let body = "" // דרך 1
readFiles("data/report-title.txt")
.then((data) => {body += " " + data; return readFiles("data/report-body.txt")})
.then((data) => {body += " " +  data; return writetoFile("data/final-report.txt",body)})
.then((data) => console.log(data))
.catch((err) => console.log(err))

Promise.all([   // דרך 2
    readFiles("data/report-title.txt"),
    readFiles("data/report-body.txt"),
    ])
.then((data) => {writetoFile("data/final-report.txt",data.join("\n")),console.log(data)})
.catch((err) => console.log(err))

7.
function readFileAsPromise(filePath){
    return fs.readFile(filePath,"utf-8")
}

readFileAsPromise("data/message.txt")
.then((data) => console.log(data) )
.catch((err) => console.log(err))

8.
function callFile(filePath){
    return fs.readFile(filePath,"utf-8")
}
let body = ""
callFile("../../callbacks-fs-practice/data/step1.txt")
.then((data) => {body+= " " + data;  return callFile("../../callbacks-fs-practice/data/step2.txt")})
.then((data) => {body += " " + data;return callFile("../../callbacks-fs-practice/data/step3.txt")})
.then((data) => {body +=" " + data;return console.log(body)})
.catch((err) => console.log(err))