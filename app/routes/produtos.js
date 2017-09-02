module.exports = function(app) {
    app.get("/produtos",function(req, res) {
        var connection = app.infra.connectionFactory();        
        var produtosBanco = app.infra.produtosBanco;
        
        connection.query('select * from livros', function(err, results){
            res.render('produtos/lista', {lista:results});
        });

        connection.end();

    });
}