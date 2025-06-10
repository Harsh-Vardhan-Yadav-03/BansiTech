const User = require("../models/user-model");
const Contact = require("../models/contact-model");

//getAllUser logic

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }); // password:0 means that it will show all data in database except password
        console.log(users);
        if (!users || users.length == 0) {
            return res.status(404).json({ message: "No user found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log("Errorin getAllUsers:", error);
        next(error);
    }
};

// single user edit logic

const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


// user update logic

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne(
            { _id: id },
            {
                $set: updateUserData,
            });
            return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}
// user delete logic

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}


//getAllContact logic

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        console.log(contacts);
        // if (!contacts || contacts.length == 0) {
        //     return res.status(404).json({ message: "No contact found " });
        // }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const deleteContactById = async ( req, res ) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUsersById, updateUserById, deleteContactById };