const app= require('./app');
const { connectDatabase } = require('./config/database');

const port = 3002;
//connectDatabase();

app.listen(port,console.log(`app is running on port ${port}`)); 