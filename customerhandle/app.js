const express = require('express');
const app = express();

var env = require('./app/config/config.json').development;

app.use(express.static(__dirname +''));
app.use(express.json());


app.get('/', (request, response, next)=>{
    response.setHeader("Content-Type", "application/json");
    response.status(404).json({ message : "Cannnot find the url on server."});
});
const port = env.server_port || 5532;
// app.get('/', (req,res) => {
//     res.send('Hello world Govind Sharma');
// });

require('./app/config/DbConfig.js');
require('./app/routes/routes.js')(app);

// app.listen( process.env.PORT, () => {
//     console.log(`Server Started. on Host ${process.env.HOST} & port ${process.env.PORT}`);
// });

app.listen(env.server_port || 5532, env.host, () => {
    console.log('Server is listening on ' + env.host + ':' + port);
});

module.exports = app;