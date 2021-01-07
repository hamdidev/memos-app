import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv  from "dotenv"
dotenv.config();
import postRoutes from './routes/posts.js'



const app = express()
const PORT = process.env.PORT || 5000


//MiddleWares
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

// App Middlewares
app.use('/posts', postRoutes)
app.get('/', (req, res)=> {
    res.send('Hello to Memos App')
})

// Connecting to db

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, ()=> console.log(`server running on port ${PORT} and DB Connected`)));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
mongoose.set('useFindAndModify', false);











