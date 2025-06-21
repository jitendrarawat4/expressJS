const Item = require('../models/Item');

//create
exports.createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
};

//Read All (with optional sort)
exports.getAllItems = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'desc' ?- 1 : 1;
        const items = await Item.find(). sort({[sortBy]: order });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


//Read One
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).json({ error: 'Item not found'});
        res.json(item)
    } catch (err) {
        res.status(500).json({ error:  err.message});
    }
};

// Update
exports.updateItem = async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
      res.json(updatedItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

// Delete
exports.deleteItem = async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };