require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000; //5000

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

//routes
app.use('/api/v1/posts', routes);



//connecting to db
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('connected db successfully!');
  } catch (err) {
    console.log(err);
  }
};
connectDB();
app.listen(port, () => {
console.log('App is running on 5000');
});
