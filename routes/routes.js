const express = require('express');
const router = express.Router();
const Model = require('../models/model');


//Post Methods
router.post('/post', async(req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try{

        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }

});

//get Methods
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data);
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
   
});

//get by Id  Methods
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.status(200).json(data);
    }

    catch(error){
        res.status(500).json({message: error.message});

    }
});

//Update by ID Methods
router.patch('/update/:id', async (req, res) => {
    
    try{
        const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};

        const result = await Model.findByIdAndUpdate(
            id, updateData, options
        )

        res.send(result);
    }

    catch(error){
        res.status(400).json({message: error.message});
    }
});

//Post Methods
router.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send('Document with ${data.name} has been deleted..');
    }

    catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;