const express = require('express');
const requireDir = require('require-dir');
const authMiddlewares = require('./middlewares/auth');
const routes = express.Router();
const controllers = requireDir('./controllers');


routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);
//abaixo dessa middlewares todas irão executar authMid...
// para saber se o user está autenticado
routes.use(authMiddlewares);

routes.put('/users', controllers.userController.update);
routes.get('/users/me', controllers.userController.me);
routes.get('/feed', controllers.userController.feed);

routes.post('/follow/:id', controllers.followController.create);
routes.delete('/unfollow/:id', controllers.followController.destroy);

routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id',controllers.tweetController.destroy)

routes.post('/like/:id', controllers.likeController.toggle);

module.exports = routes;
