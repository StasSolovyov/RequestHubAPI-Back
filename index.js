const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/', requestRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
