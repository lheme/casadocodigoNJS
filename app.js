var app = require('./config/express')();
//removida a linha que servia somente para carregar o arquivo de rotas
//var rotasProdutos = require('./app/routes/produtos')(app);

app.listen(3000, function(){
    console.log("Servidor rodando");
});