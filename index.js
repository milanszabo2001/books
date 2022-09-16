import { config } from "./dbconfig.js";
import express from 'express'
import mysql from 'mysql'

const app = express()
app.use(express.json())
const db=mysql.createConnection(config)

app.get('/',(request, response)=>{
    db.query('SELECT author FROM `books` GROUP BY author order by author',(err, result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    })
})

app.get('/categ/:category/:year',(request, response)=>{
    const {category,year} = request.params

    db.query('SELECT author,title FROM `books` WHERE category=? and year>=?',[category,year],(err, result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    })
})

app.get('/azon/:id',(request, response)=>{
    const { id } = request.params

    db.query('SELECT * FROM `books` WHERE id=? order by title',[id],(err, result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    })
})

app.put('/:id/:year',(request, response)=>{
    const {id,year}=request.params
    db.query('UPDATE BOOKS set year=? where id=?',[year,id],(err,result)=>{
        if(err)
            console.log(err)
        if(result.affectedRows==1)
            response.send({message:"Sikeres adatmódosítás!"})
        else
        response.send({message:"Nem sikerült az adatmódosítás."})
    })
})

app.put('/',(request, response)=>{
    const {id,category,year}=request.body
    db.query('UPDATE BOOKS set category=? , year=? where id=?',[category,year,id],(err,result)=>{
        if(err)
            console.log(err)
        if(result.affectedRows==1)
            response.send({message:"Sikeres adatmódosítás!"})
        else
        response.send({message:"Nem sikerült az adatmódosítás."})
    })
})

app.post('/',(request, response)=>{
    const {category,year,title,author}=request.body
    db.query('insert into books values (null,?,?,?,?)',[author,title,year,category],(err,result)=>{
        if(err)
            console.log(err)
        if(result)
            response.send({message:`Sikeres adatbeírás! id:${result.insertedId}`})
        else
        response.send({message:"Nem sikerült az insert."})
    })
})

app.delete('/:id',(request, response)=>{
    const {category,year,title,author}=request.body
    db.query('delete from books where id=?',[id],(err,result)=>{
        if(err)
            console.log(err)
        if(result.affectedRows==1)
            response.send({message:`Sikeres törlés!`})
        else
            response.send({message:"Nem sikerült az adattörlés."})
    })
})

app.get('/categ/:category',(request, response)=>{
    const {category} = request.params

    db.query('SELECT author,title FROM `books` WHERE category=?',[category],(err, result)=>{
        if(err)
            console.log(err)
        else
            response.send(result)
    })
})

app.listen(5000,() => console.log('server listening on port 5000...')) 

