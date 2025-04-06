// const User = require("../models/user-model");
// const bcrypt = require("bcryptjs");


// const home = async(req, res) =>{
//     try {
//         res.send(" Welcome to home using controller. ");
//     } catch (error) {
//         res.status(500).send({msg:"Page not found"});       
//     }
// }

// const register = async(req, res) =>{
//     try {
//         console.log(req.body);
//         const { username , email , password , phone } = req.body;

//         const userExist = await User.findone({email});

//         if( userExist ){
//             return res.status(400).json({ msg: "Email already exists " });
//         }

//         const userCreated = await User.create({ username,  email, password , phone });
//         res.status(200).json("msg: userCreated ");
//     } catch (error) {
//         res.status(500).send({msg:" internal server error "});      
//     }
// }

// const login = async(req, res) =>{
//     try {
//         const { email, password } = req.body;
//         const userExist = await User.findone({ email });
//         console.log(userExist);

//         if( !userExist){
//             return res.status(400).json({ msg: " Invalid Credentials"});
//         }
        
//         const isMatch = await bcrypt.compare(password, userExist.password);
//         if(isMatch){
//             res.status(200).json({ msg: "Login Successfull" });
//         }else{
//             res.status(401).json({message:" Invalid email or password" });
//         }

//     } catch (error) {
//         res.status(500).send({msg:" internal server error "});    
//     }
// }

// module.exports = {home, register, login};

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

        // Destructure and sanitize
        let { firstName, lastName, email, password, confirmPassword, phone } = req.body;

        // Optional: Handle missing phone from frontend (for now, use dummy or default)
        if (!phone) {
            phone = "0000000000"; // Or handle validation on frontend
        }

        const username = `${firstName} ${lastName}`.trim();

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
        });

        res.status(201).json({ msg: "User registered successfully", user: userCreated });
    } catch (error) {
        console.error("REGISTER ERROR:", error.message);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {
            res.status(200).json({ msg: "Login Successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

module.exports = { home, register, login };
