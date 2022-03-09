const express = require('express')  
const app = express()  

enum MathOperations {
  dodaj = 'dodaj', 
  usun = 'usun', 
  podziel = 'podziel', 
  pomnoz = 'pomnoz' 
}

app.get('/', function (req, res) {  
  const operation: MathOperations = req.query.operations;
  const num1 = req.query.num1 
  const num2 = req.query.num2 

  switch(operation) {
    case 'dodaj': 
    res.send("'$(num1 + num2)'"); 
    //console.log(result);
    case 'usun': 
    res.send("'$(num1 - num2)'"); 
    //console.log(result);
    case MathOperations.podziel: 
    res.send("'$(num1 / num2)'"); 
    //console.log(result);
    case MathOperations.pomnoz: 
    res.send("'$(num1 * num2)'"); 
    //console.log(result);
  }



})  
app.listen(3000)  

