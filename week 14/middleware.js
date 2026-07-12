1.
// הפעלת תהליך שאמור להתבצע בכל הפעל ראוטר

2.
// req, res, next

3.
// הבקשה פשוט תתקע והלקוח לא יקבל כלום

4.
// app.use(logger) שימוש בפונקציית מידלוור
// app.use('/api/users', logger) שימוש בנתיב ספציפי
// app.get('/profile', logger, handler) שימוש בשני פונקציות אחת אחרי השנייה

5.
// הוא מגדיר שכל נתונים שיתקבלו מהשרת יתקבלו רק בפורמט json ואם לא אז יהיה בלאגן בסוגי הקבצים

6.
function logger(req, res, next) {
    console.log(req.method)
    console.log(req.url)
    next()
    }

7.
const express = require('express');
const app = express();

app.use(express.json())

app.post('/users', (req, res) => {
  console.log(req.body); // צריך להדפיס אובייקט ולא undefined
  res.json({ received: req.body });
})

8.
function auth(req, res, next) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next()
}

9.
// שליחת מידוור לוגר ואחכ home
// logger, auth, data
// logger, בדיקה של אימות ומעבר ל data

10.
// קודם יעבור לפונקציה הבאה ואחכ ישלח סטטוס

11.
function requestTimer(req, res, next) {
    req.startTime(Date.now())
    next()
}

12.
import express from 'express'

app = express()

app.use(express.json())

function logger(req, res, next) {
    console.log(req.method)
    console.log(req.url)
    next()
}

app.get('/public', (req, res) => {
    res.send({message: 'public'})
})

app.get('/private', auth, (req, res) => {
    res.send({message: 'secret'})
})

13.
function validateBody(req, res, next) {
    const {name, email, age} = req.body()
    if (!name || !email || !age) {
        res.status(400).json({
            message: "Missing value from the list"
        })
    }
}