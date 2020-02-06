  var mongoose = require('mongoose')

  var mongoDB = 'mongodb://127.0.0.1/finaldb';
  var onlineDb = "mongodb://documentdbmaster:masterpass@docdb-2020-02-06-06-43-30.cluster-crpbhb92z35h.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
  mongoose.connect(onlineDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
  }, function(err) {
      if (err) {
          console.log("Can not connect ot mongodb!!")
      } else {
          console.log("Connected to: ",onlineDb)
      }
  });