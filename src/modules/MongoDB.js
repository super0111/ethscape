const Mongoose = require('mongoose');

const MongoDB = () => {
  if (process.env.MONGODB) {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }

    return Mongoose.connect(process.env.MONGODB, options)
  } else {
    return new Promise((resolve, reject) => {
      reject('Set MONGODB url in env')
    })
  }
}

module.exports = MongoDB;


