
const express =require('express');

const app =express()

///express middleware
app.use(express.json()); //req.body 
app.use(express.urlencoded({extended:true}))

//route variables
const books=require('./Routes/Books');
const home =require('./Routes/home')

//routes
app.use('/api/books',books);
app.use('/', home)

//templates enging 
app.set('view engine','pug')

const PORT=process.env.PORT || 3000

app.listen(PORT ,()=>console.log(`server runs on port ${PORT}`))