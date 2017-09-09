module.exports = function(app) {

    var listaProdutos = function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results) {
            res.format({
                html: function() {
                    res.render('produtos/lista', {lista:results});
                },
                json: function() {
                    res.json(results);
                }
            });
        });

        connection.end();
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/json', function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results) {
            res.json(results);
        });

        connection.end();
    });

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form',{errosValidacao:{}, produto:{}});
    });

    app.post('/produtos', function(req, res) {
        var produto = req.body;
        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        var validadorTitulo = req.assert('titulo','Titulo deve ser preenchido').notEmpty();
        req.assert('preco','Preço deve ser um número').isFloat();

        var errors = req.validationErrors();
        if(errors) {
            res.format({
                html: function() {
                    res.status(400).render('produtos/form',{errosValidacao : errors, produto : produto});
                },
                json: function() {
                    res.status(400).send(errors);
                }
            });
            return;
        }

        produtosDAO.salva(produto, function(err, results) {
            res.redirect('/produtos');
        });

        connection.end();
    });
}
