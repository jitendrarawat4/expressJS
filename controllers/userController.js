const User = require('../models/user');


//get All Users
exports.getAllUsers = async (req, res) => {
try {
    const users = await User.find();
    if(users.length ===0){
        return res.status(404).json({message: "No user Found"});
    }
    res.status(200).json(users);
} catch (err){
    res.statusCode(500).json({ message: err.message})
}
};

//getALl Users with sorting
exports.getAllUserswithSorting = async (req, res) => {
    try {
        const sortBy = req.query.sort || 'name';
        const sortOrder = req.query.order === 'desc' ? -1 : 1;
        const users = await User.find().sort([sortBy], sortOrder);
        if(users.length ===0){
            return res.status(404).json({message : "No User Found"});
        }
    } catch (err) {
        res.status(500).json({message : "Internal Server Eerror"});
    }
};

// get User By Id
exports.getUserById = async (req, res) => {
    try{
        const user = await User.findUserById(req.param.id);
        if(!user){
            return res.status(404).json({message :"User Not Found!"});
        }
        req.status(200).json(user);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

// Create User
exports.createUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

//update user by Id
exports.updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.param.id, req.body, {new : true});
        if(!updatedUser) {
            return res.status(404).json({message : "User Not Found"});
        }
        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json({message :err.message});
    }
};

//delete USer By Id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.deleteUserById(req.param.id);
        if(!user){
            return res.status(404).json({message : "User Not Found"});
        }
        res.status(200).json(user)
    } catch (err){
        res.status(500).json({message : err.message});
    }
};
 