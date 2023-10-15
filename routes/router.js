const userRoutes = require('./definitions/user');

const createRouter = (router) => {
  router.use('/user', userRoutes)

  return router
}

module.exports = createRouter;