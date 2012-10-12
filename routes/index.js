/*jshint node:true */

/*
 * GET home page.
 */
exports.index = function(req, res) {
    res.render('index', {
        title: 'Markdown Writer',
        user: req.session.auth ? req.session.auth.github.user : null
    });
};