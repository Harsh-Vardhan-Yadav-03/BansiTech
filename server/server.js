const express = require("express");
const cors = require("cors");
const app = express();
const authroute = require("./router/auth_router");
const contactRoute = require("./router/contact-router");
const connectdb = require("./utils/db"); 
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));   //tackle cors policies

app.use(express.json()); //middleware

app.use("/api/auth", authroute );
app.use("/api/form", contactRoute );
app.use(errorMiddleware);

// app.get("/", (req , res) => {
//     res.status(200).send("Welcome to my channel.");
// });

const PORT = 5000;

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is active at port: ${PORT}`);
    });
});