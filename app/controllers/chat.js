module.exports.room = function (application, req, res) {
	let formData = req.body;

	req.assert('nickname', 'Nome é obrigatório!').notEmpty();
	req.assert('nickname', 'Nome deve conter entre 3 e 15 caracteres').len(3, 15);

	let errors = req.validationErrors();

	if (errors) {
		res.render('index', {errors});
		return;
	}

	application.get('io').emit('login', {nickname : formData.nickname});
	
	res.render('chat', {formData});
}