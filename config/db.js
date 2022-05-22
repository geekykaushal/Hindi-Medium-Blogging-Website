const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI');


const mongodb = async () => {
  try {
     await mongoose.connect(db , {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify:false
          
      })

      console.log('Connected to database')
  } catch (err) {
      console.log(err.message);
  }
}

module.exports = mongodb