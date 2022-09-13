import express, { json, response } from "express";
import { diakok } from "./adatok.js";

const app = express();
app.use(express.json())

app.get('/', (request, response) => {
    //response.send('Saját szerverünk küldi ezt az üzenetet!')
    response.send(diakok)
})
//url-ben érkező paraméter
app.get('/:id', (request, response) => {
    const {id} = request.params//az url-ben érkező paraméterek elérése
    const filteredArray = diakok.filter(obj=>obj.id==id)
    response.send(filteredArray)
})
app.post('/', (request, response) =>{
    const {id,nev,osz}=request.body
    diakok.push({id:id,nev:nev,osz:osz})
    response.send(diakok)
})
app.get('*', (request, response) => {
    response.status(404).send('Az oldal nem létezik...')
})

app.listen(5000,() => console.log("server listening on port 5000..."))