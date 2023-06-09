const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');



const PORT = process.env.PORT || 3000;
const app = express();
console.log('working')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
console.log('before db.on')
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});
