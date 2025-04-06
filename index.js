//Define defaults
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type', 'ngrok-skip-browser-warning']
};

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors(corsOptions));

//Define routes
require('./routes/omnichannel.routes')(app);
require('./routes/authentication.routes')(app);
require('./routes/users.routes')(app);
require('./routes/tickets.routes')(app);
require('./routes/sunco.routes')(app);
require('./routes/customobject.routes')(app);
require('./routes/xaas.routes')(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});