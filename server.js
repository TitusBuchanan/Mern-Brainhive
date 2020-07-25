const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose')

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000

const users = require('./routes/api/users');
const profiles = require("./routes/api/profiles");
const posts = require('./routes/api/posts');


app.use("/api/profiles", profiles);
app.use("/api/users", users);
app.use("/api/posts", posts);

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