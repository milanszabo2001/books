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

app.get('/kateg/:category/:year',(request, response)=>{
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

app.listen(5000,() => console.log('server listening on port 5000...')) 

