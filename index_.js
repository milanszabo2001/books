console.log('a node futtatja ezt a fájlt!')

const szam=Math.round(Math.random()*100)
console.log(`A véletlen szám: ${szam}`)
if(szam>=50)
    console.log('Gratula!')
else
    console.log('Sajnálom...')

szam>=50 ? console.log("Gratulálok!") : console.log("Őszintén sajnálom!")

import { diakok } from "./adatok.js"
import {pers} from "./adatok.js"

console.log(`A diákok létszáma:${diakok.length}`)

for(let obj of diakok){
    console.log(`Kedves ${obj.nev}!
    Ha több információra lenne szüksége, csengessen meg.
    Tisztelettel, ${pers.nev},
    tel.${pers.tel}
    `)
}