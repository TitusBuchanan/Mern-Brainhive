const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/default.json');
const mongoose = require('mongoose')

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000

const users = require('./routes/api/users');

app.use("/api/users", users);

mongoose.connect(
    config.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => console.log("connected to database")
  );
  


app.listen(PORT, () => console.log('Server Running'))