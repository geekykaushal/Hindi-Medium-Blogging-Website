const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')

//datebase
const mongoDB = require('./config/db')
mongoDB();


//CROSS ORGIGIN
app.use(cors())

//setting up the port
const port = process.env.PORT || 5000;


//Parsing incoming Date
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



//middleware Route
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/forgot', require('./routes/forgot'))
app.use('/reset', require('./routes/reset'))
app.use('/blog', require('./routes/blog/blog'))

//server static data (React)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname+'\\client\\build')));

    app.get('*' , (req, res) => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'))
    })
}

console.log(__dirname+'\\client\\build')


app.listen(port, () => console.log('connected on port' + port))