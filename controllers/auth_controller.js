const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async(req, res) =>{
    try {
        res.send(" Welcome to home using controller. ");
    } catch (error) {
        res.status(500).send({msg:"Page not found"});       
    }
}

const register = async(req, res) =>{
    try {
        console.log(req.body);
        const { username , email , password , phone } = req.body;

        const userExist = await User.findone({email});

        if( userExist ){
            return res.status(400).json({ msg: "Email already exists " });
        }

        const userCreated = await User.create({ username,  email, password , phone });
        res.status(200).json("msg: userCreated ");
    } catch (error) {
        res.status(500).send({msg:" internal server error "});      
    }
}

const login = async(req, res) =>{
    try {
        const { email, password } = req.body;
        const userExist = await User.findone({ email });
        console.log(userExist);

        if( !userExist){
            return res.status(400).json({ msg: " Invalid Credentials"});
        }
        
        const isMatch = await bcrypt.compare(password, userExist.password);
        if(isMatch){
            res.status(200).json({ msg: "Login Successfull" });
        }else{
            res.status(401).json({message:" Invalid email or password" });
        }

    } catch (error) {
        res.status(500).send({msg:" internal server error "});    
    }
}

module.exports = {home, register, login};