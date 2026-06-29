1.
function getKeys(object){
    return Object.keys(object)
}

console.log(getKeys({ name: "Shirt",  price: 50,  inStock: true,  category: "fashion" }))

2.

function getValues(object){
    return Object.values(object)
}

console.log(getValues({ name: "Shirt",  price: 50,  inStock: true,  category: "fashion" }))

3.
function interable(object){
    const arr = Object.entries(object)
    for (i of arr) {
        console.log(i[0],":", i[1])
    }
}

interable({ name: "Shirt",  price: 50,  inStock: true,  category: "fashion" })

4.
function average(object){
    let total = 0
    const arrValue = Object.values(object)
    for (const value of arrValue){
        total += value
    }
    return total/arrValue.length
    

}
console.log(average({ math: 80, english: 90, science: 70 }))

5.
function twoToOne(object1,object2){
    return Object.assign(object1,object2)
}
console.log(twoToOne({name:"david",id:324645126},{city:"jerusalem"}))

6.
function merge(object1,object2){
    return Object.assign(object1,object2)

}
console.log(merge({theme:"light",lang:"en"},{lang:"he"}))

7.
function getObjectKey(object,key){
    console.log(Object.hasOwn(object,key))

}
getObjectKey({name:"david",city:"jerusalem"}, "name")

8.
const person = Object.freeze(
    {name:"david"}
)
person.name = "avi" // לא משנה
console.log(person)

9.
function getMatrix(matrix){
    const obj = {}
    for (const [key,value] of matrix){
        obj[key] = value
    }
    return obj

}
console.log(getMatrix([["name","Alice"],["age",25]]))

10.
const prise = { apple: 10, banana: 5, mango: 20 }
function decrese(){
    return Object.fromEntries(Object.entries(prise).map(([key,value]) => [key,value -1.1]))
}
console.log(decrese())

11.
function getObject(object){
    return Object.fromEntries(Object.entries(object).filter(([key,value]) => typeof value === "number"))


}
console.log(getObject({name:"david",age:28}))

12.
const object = {name:"david",age:28}
function coppyShaddow(){
    const copy = {...object}
    copy.name = "avi"
    console.log(object)
}
coppyShaddow()

13.
function getTwoObject(object1,object2){
    const arrObject1 = Object.keys(object1)
    const arrObject2 = Object.keys(object2)
    if (arrObject1.length === arrObject2.length && arrObject1.every(key =>Object.hasOwn(object2,key))){
        return true
    }
    else{
        return false
    }
}
console.log(getTwoObject({name:"david",age:28},{name:"david",age:28}))