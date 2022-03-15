const express = require('express')  
const app = express()  
let query 

app.get('/dodaj/:num1/:num2', function (req, res) {  
  //const operation: MathOperations = req.query.operations;
  const num1 = +req.query.num1; 
  const num2 = +req.query.num2; 
  const sum = num1 + num2 

  res.send(sum.toString())

})  
app.listen(3000)  

