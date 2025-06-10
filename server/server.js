require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authroute = require("./router/auth_router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service_router");
const connectdb = require("./utils/db"); 
const adminRoute = require("./router/admin-router")
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}

app.use(cors(corsOptions));   //tackle cors policies

app.use(express.json()); //middleware

app.use("/api/auth", authroute );
app.use("/api/form", contactRoute );
app.use("/api/data", serviceRoute );

app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 5000;

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is active at port: ${PORT}`);
    });
});