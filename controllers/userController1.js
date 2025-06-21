const User = require('../models/user1');

//get all Users
exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        if(users.length===0){
            return res.status(404).json({message : "No UserFound!"});
        }
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

//get All Users with sorting
exports.getAllUsersWithSorting = async (req, res) => {
    try {
        const sortBy = req.query.sort || 'name';
        const sortOrder = req.query.order === 'desc' ? -1 : 1;
        const users =  await User.find().sort([sortBy], sortOrder);
        if(users.length===0){
            return res.status(404).json({message : "No UserFound!"});
        }
    } catch(err){
        res.status(500).json({message : err.message});
    }
};

//get User by Id
exports.getUserById = async (req, res) => {
    try{
        const user = await User.findUserById(req.param.id);
        if(!user){
            return res.status(404).json({message : "No UserFound!"});
        }
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//create new User
exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

//update User by ID
exports.updateUser = async (req,res) => {
    try {
        const user = await User.getUserByIdAndUpdate(req.param.id, req.body, {new : true});
        if(!user){
            return res.status(404).json({message : "No User Found!"});
        }
        res.status(200).json(user);
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

//delete User By Id
exports.deleteUser = async (req, res) => {
     try {
        const user = User.deleteUserById(req.param.id);
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }
        res.status(200).json(user);
     } catch (err){
        res.status(500).json({message: err.message});
     }
};