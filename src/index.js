
const { response } = require("express");
const express = require("express");
const app = express();
const uuid = require('uuid');
app.use(express.json());

//middlewares
const verificarId = (request,response,next) => {
    const {id} = request.params;
    const index = fakedb.findIndex(func => func.id === id);
    if(index < 0) {
        return response.status(404).json('ID inexistente.');
    }
    next();
    
}
const verificarInformacoes = (request,response,next) => {
    const {nome,funcao,departamento,email,telefone} = request.body;
   
    if(nome == undefined ||funcao == undefined||departamento == undefined ||email == undefined || telefone == undefined) {
        return response.status(400).json('Verifique os campos! Um ou mais campo está vazio.')
    }
    next();
    
}
// cadastrar funcionario
var fakedb = [];


app.get('/funcionario',(request,response) => {
    return response.status(200).json(fakedb);
})
app.get('/funcionario/:id', verificarId, (request,response) => {
    const {id} = request.params;
    const index = fakedb.findIndex(func => func.id === id);
    const funcionario = fakedb[index];
    return response.status(200).json(funcionario);
})
app.delete('/funcionario/:id', verificarId, (request,response) => {
    const {id} = request.params;
    const index = fakedb.findIndex(func => func.id === id);
    fakedb.splice(index, 1);
    return response.status(204).send();
});

app.put('/funcionario/:id', verificarId, verificarInformacoes, (request,response) => {
    const {id} = request.params;
    const {nome,funcao,departamento,email,telefone} = request.body;

    const funcionario = fakedb.findIndex(func => func.id === id);
    const newFuncionario = {
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone,
    }
    fakedb.splice(funcionario, 1, newFuncionario);
    
    return response.status(200).json(newFuncionario);
});

app.post('/funcionario', verificarInformacoes, (request,response) => {

    const {nome,funcao,departamento,email,telefone} = request.body;
    const funcionario = {
        id: uuid.v4(), 
        nome: nome,
        funcao: funcao,
        departamento: departamento,
        email: email,
        telefone: telefone,

    }

    fakedb = [...fakedb, funcionario]; 
    return response.status(201).json(funcionario);

   
});



const port = 3000;
app.listen(port, ()=> {
    console.log(`Server rodando! Porta => ${port}`);
})          