const Mongoose = require('mongoose');
const DB = () => {
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

module.exports = DB;

// const DB = async () => {
//   try {
//     await Mongoose.connect(process.env.MONGODB, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true
//     });

//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.error(err.message);
//     // Exit process with failure
//     process.exit(1);
//   }
// };

// module.exports = DB;
