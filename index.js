require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./src/routes/user.router')

const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(userRouter);

app.get("/", (req, res) => {
    res.send("API Ready to use !")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
