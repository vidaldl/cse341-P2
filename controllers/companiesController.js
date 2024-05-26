const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb'); 

const getCompanies = async (req, res, next) => {
  const result = await mongodb.getDb().db("vendingManagement").collection('companies').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getCompanyById = async (req, res, next) => {
 
  const companyID = req.params.id;

  if (!ObjectId.isValid(companyID)) {
    return res.status(400).json({ message: 'Invalid company ID format' });
  }

  const db = mongodb.getDb().db("vendingManagement");
  const collection = db.collection('companies');
  const result = await collection.findOne({ _id: new ObjectId(companyID) });

  if (!result) {
    return res.status(404).json({ message: 'Company not found' });
  }

  res.status(200).json(result);
   
};


// Create a company
const createCompany = async (req, res, next) => {

  const company = {
      name: req.body.name,
      address: req.body.address,
      contact_info: {
        phone: req.body.phone,
        email: req.body.email
      }
  };
  
  const result = await mongodb.getDb().db("vendingManagement").collection('companies').insertOne(company);

  if (result.acknowledged) {
      res.status(201).json(result); // 201 Created
  } else {
      res.status(500).json({ message: "Failed to insert company" });
  }
  
};




const updateCompany = async (req, res, next) => {
 
    const companyId = new ObjectId(req.params.id); 
    const updatedCompany = {
        name: req.body.name,
        address: req.body.address,
        contact_info: {
        phone: req.body.phone,
        email: req.body.email
        }
    };


  const result = await mongodb.getDb()
      .db("vendingManagement")
      .collection('companies')
      .updateOne({ _id: companyId }, { $set: updatedCompany });

  if (result.modifiedCount > 0) {
      res.status(204).end(); // 204 Updated
  } else {
      res.status(404).json({ message: "company not found" });
  }
  
};

const deleteCompany = async (req, res, next) => {
  
  const companyId = new ObjectId(req.params.id);

  const result = await mongodb.getDb()
      .db("vendingManagement")
      .collection('companies')
      .deleteOne({ _id: companyId });

  if (result.deletedCount > 0) {
      res.status(204).end(); // 204 Deleted
  } else {
      res.status(404).json({ message: "company not found" });
  }
  
};

module.exports = {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};
