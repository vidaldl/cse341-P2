const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb'); 


const getVendingMachines = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("vendingManagement").collection('vending_machines').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    next(err);
  }
};

const getVendingMachineById = async (req, res, next) => {
    try {
      const machineID = req.params.id;

  
      const db = mongodb.getDb().db("vendingManagement");
      const collection = db.collection('vending_machines');
      const result = await collection.findOne({ _id: new ObjectId(machineID) });
  
      if (!result) {
        console.log(`Vending machine not found with ID: ${machineID}`);
        return res.status(404).json({ message: 'Vending machine not found' });
      }
  
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  const getVendingMachinesByCompanyId = async (req, res, next) => {
    try {
      const companyId = req.params.companyId;
  
      if (!ObjectId.isValid(companyId)) {
        return res.status(400).json({ message: 'Invalid company ID format' });
      }
  
      const db = mongodb.getDb().db("vendingManagement");
      const collection = db.collection('vending_machines');
      const result = await collection.find({ companyId: new ObjectId(companyId) }).toArray();
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'No vending machines found for this company' });
      }
  
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  const createVendingMachine = async (req, res, next) => {
    try {
  
      const machine = {
        location: {
          address: req.body.address,
          coordinates: {
            lat: req.body.lat,
            long: req.body.long
          }
        },
        model: req.body.model,
        status: req.body.status,
        companyId: new ObjectId(req.body.companyId)
      };
  
      const result = await mongodb.getDb().db("vendingManagement").collection('vending_machines').insertOne(machine);
  
      if (result.acknowledged) {
        res.status(201).json(result);
      } else {
        res.status(500).json({ message: "Failed to insert vending machine" });
      }
    } catch (err) {
      next(err);
    }
  };

  const updateVendingMachine = async (req, res, next) => {
    try {
  
      const machineId = new ObjectId(req.params.id); 
      const updatedMachine = {
        location: {
          address: req.body.address,
          coordinates: {
            lat: req.body.lat,
            long: req.body.long
          }
        },
        model: req.body.model,
        status: req.body.status,
        companyId: new ObjectId(req.body.companyId)
      };
  
      const result = await mongodb.getDb()
        .db("vendingManagement")
        .collection('vending_machines')
        .updateOne({ _id: machineId }, { $set: updatedMachine });
  
      if (result.modifiedCount > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Vending machine not found" });
      }
    } catch (err) {
      next(err);
    }
  };

  const deleteVendingMachine = async (req, res, next) => {
    try {
      const machineId = new ObjectId(req.params.id);
  
      const result = await mongodb.getDb()
        .db("vendingManagement")
        .collection('vending_machines')
        .deleteOne({ _id: machineId });
  
      if (result.deletedCount > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Vending machine not found" });
      }
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getVendingMachines,
    getVendingMachineById,
    createVendingMachine,
    updateVendingMachine,
    deleteVendingMachine,
    getVendingMachinesByCompanyId
  };