/* IMPORTANDO MÓDULOS */
let express = require('express');
let consign = require('consign');
let validator =  require('express-validator');
let bodyParser = require('body-parser');

/* INICIANDO O OBJETO DO EXPRESS (ABSTRAÇÃO DO SERVIDOR) */
let app = express();

/* CONFIGURANDO ENGINE DE VIEWS */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* CONFIGURANDO MIDDLEWARES */
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(validator());

/* CONFIGURANDO AUTOLOAD COM O CONSIGN */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* EXPORTANDO O SERVIDOR CONFIGURADO */
module.exports = app;