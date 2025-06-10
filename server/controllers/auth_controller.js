const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.send("Welcome to home using controller.");
    } catch (error) {
        res.status(500).send({ msg: "Page not found" });
    }
};

const register = async (req, res) => {
    try {
        console.log("REQ.BODY:", req.body);

        let { firstName, lastName, email, password, confirmPassword } = req.body;

        const username = `${firstName} ${lastName}`.trim();

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ msg: "User registered successfully", user: userCreated });
    } catch (error) {
        console.error("REGISTER ERROR:", error.message);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};


// User Login Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {
            res.status(200).json({ 
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// To send user data = User Logic

const user = async (req, res) => {
    try {
       const userData = req.user;
       console.log(userData);
       return res.status(200).json({ userData });

    } catch (error) {
        console.log(`error from the user route ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { home, register, login, user };
