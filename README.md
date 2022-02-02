# covid-student-tracker
Simple personal project for my mother's class

*It is in french but can be changed with a few modification*

## Functionality 

- \<table> containing surname, name, the "positive situation", and the "contatc situation"
- login/signup handling ( signup is in commentary because it is unnecessary for my case
![list_covid_tracker](https://user-images.githubusercontent.com/39086298/152086496-8542f32b-b6fc-45f6-ab9b-7f78b5d6de34.png)

- adding pupil 
![image](https://user-images.githubusercontent.com/39086298/152087717-500a9e43-9524-42ad-9b31-9ac5f028e33c.png)

- possibility to modify a pupil
![image](https://user-images.githubusercontent.com/39086298/152087317-9f150910-dadd-4e1f-92b4-2be237320b03.png)

- modify a list of pupil ( only those without a "situation positve or contact) to declare a case
![image](https://user-images.githubusercontent.com/39086298/152087545-fb8ddbc7-836c-4a96-b018-e73ec82ea421.png)

- create and download a csv file

### Remark
It is linked with an external MongoDB server a is used with mongoose 
To start localy need a /backend/.secret.js conataining 
```
exports.SECRET_URL_MDB ="mongoDBAccess"
exports.SECRET_TOKEN ="yourSecretToken"
```
To deploy on a server in /client a const.js will be necessary with the location of itself ( yeah that's not pretty ) 

### Start

localy :
start the client side ( react app ) 
```
cd ./client && npm start 
```
and  start the backend 
```
cd ./backend && npm start 
```
or for auto refresh 
```
cd ./backend && npx nodemon server.js
```

-------
On server deployment: 
```
npm run heroku-postbuild && npm start
```



