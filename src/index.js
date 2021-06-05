
const express = require("express");
const app = express();
const uuid = require('uuid');
app.use(express.json());
// cadastrar funcionario
var fakedb = [];
app.post('/funcionario',(req,res) => {

    const {nome,funcao,departamento,email,telefone} = req.body;
    const funcionario = {
        id: uuid.v4(), 
        nome: nome,
        funcao: funcao,
        departamento: departamento,
        email: email,
        telefone: telefone,
    }

    fakedb = [...fakedb, funcionario]; 
    return res.status(201).json(funcionario);

   
});



const port = 3000;
app.listen(port, ()=> {
    console.log(`Server rodando! Porta => ${port}`);
})          