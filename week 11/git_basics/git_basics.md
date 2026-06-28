1. תיקייה רגילה הי לא מגובה בשום מקום והיא רק על המחשב שלי.. ריפו הוא מגובה בגיטהאב והוא מגובה גם בענן של גיט

2.
git init

3.
.git

4.
working > staged > commit > ripo

5.
git add about.html; git commit -m 'add about.html'
git push

6.
קובץ שלא עשיתי לו git add  הוא נמצא עדיין על המחשב שלי ואים לגיט שום ידע לגביו... אחרי שעשיתי לו git add  גיט כבר מודע אליו והוא מחכה שאני יעשה לו קומיט בשביל שהוא ישמורת אתהשינויים שעשיתי

7.
git status

8.
git log

9.
git diff a1b2c3d e4f5g6h

10.
git status מציג קבצים שהשתנו  git log  מציג היסטוריית קומיטים

11.
node_modules /
.env 
מכייון שהם קבצי מערכת שאין צורך שיהיו מגובים בגיט וגם אין צורך שיוכלו להיחשף אליו כל מי שפותח את הריםו שלי בגיט

12.
node_modules /
.env

13.
היה חשיפה לכל המפתחות API שהפרוייקט משתמש בהםן וזה חשוף לפריצות אבטחה

14.
git init 
git status
touch .gitignore (מוסיפים את כל מה שלא צריך להעלות)
git add app.py
git diff --staged
git commit -m 'add app.py'
git log

15.
git init > git add > git commit

16.
זה עלול ליצור התנגשויות עם מחברים אחרים בפרוייקט... אני יכתוב 5 ואחד אחר יכתוב גם 5.... וגם ככה זה יותר מאובטח ומוצפן
