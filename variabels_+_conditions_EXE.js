const age = 20

if (age >= 18) {
    console.log('מבוגר')
} else {
    console.log('קטין')
}

const number = 7

if (number % 2 === 0) {
    console.log('זוגי')
} else {
    console.log('אי זוגי')
}

const isLoggingId = true

if (isLoggingId === true) {
    console.log('ברוך הבא')
} else {
    console.log('אנא התחבר')
}

const num = 10

console.log(num > 0 ? 'חיובי' : num < 0 ? 'שלילי' : 'אפס')

const a = 10;
const b = 20;

if (a > b) {
    console.log(a)
} else if (b > a) {
    console.log(b)
} else {
    console.log ("==")
}

const password = '1234'

if (password === password) {
    console.log('גישה מאושרת')
} else {
    console.log('סיסמה שגויה')
}

const x = 5

if (x >= 10 && x <= 20) {
    console.log('true')
} else {
    console.log('false')
}

const grade = 60

if (grade >= 90) {
    console.log('מצוין')
} else if (grade >= 75 && grade <= 89) {
    console.log('טוב')
}else if (grade <= 74 && grade >= 60) {
    console.log('עובר')
} else if (grade < 60) {
    console.log('נכשל')
}

const temp = 28

if (temp > 30) {
    console.log('חם מאוד, שתה מים')
} else if (temp >= 20 && temp <= 30) {
    console.log('נעים בחוץ')
} else if (temp < 20) {
    console.log("קר, קח ג'קט")
}

const isAdmin = false
const isManager = true

if (isAdmin || isManager) {
    console.log('גישה מותרת')
} else {
    console.log('אין גישה')
}

const hasCard = true

if (hasCard === false) {
    console.log('אין גישה')
} else {
    console.log('כניסה מאושרת')
}

const name = ""

if (name == false) {
    console.log('אורח')
} else {
    console.log(name)
}

const arr = [];

console.log(arr.length === 0 ? "המערך ריק" : "המערך אינו ריק");

for (let i = 1; i < 11 ; i ++) {
    console.log(i)
}

for (let i = 10; i > 0; i--) {
    console.log(i)
}