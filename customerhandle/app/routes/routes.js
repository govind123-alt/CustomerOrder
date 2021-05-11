const userRouter = require('./user.routes.js');

module.exports = (app) => {
    app.use('/user',userRouter);
}