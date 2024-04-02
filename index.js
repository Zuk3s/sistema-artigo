
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';


const app = express();
app.use(express.json());
dotenv.configDotenv();

//ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/artigos') //completar daqui

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB in port');
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  })
}).catch((error) => {
  console.log('MongoDB connection error:', error);
});

