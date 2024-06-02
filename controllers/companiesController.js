const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getCompanies = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db("vendingManagement").collection('companies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const companyID = req.params.id;
    console.log(`Fetching company with ID: ${companyID}`);

    const db = mongodb.getDb().db("vendingManagement");
    const collection = db.collection('companies');
    const result = await collection.findOne({ _id: new ObjectId(companyID) });

    if (!result) {
      console.log(`Company not found with ID: ${companyID}`);
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createCompany = async (req, res, next) => {
  try {
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
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: "Failed to insert company" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  try {
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
      res.status(204).end();
    } else {
      res.status(404).json({ message: "company not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const companyId = new ObjectId(req.params.id);

    const result = await mongodb.getDb()
      .db("vendingManagement")
      .collection('companies')
      .deleteOne({ _id: companyId });

    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "company not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
