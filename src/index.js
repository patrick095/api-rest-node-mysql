require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const PORT = process.env.PORT;
const app = require("./app");

app.listen(PORT, () =>{
    console.log("app listening at port "+PORT);
})