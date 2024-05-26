const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb'); 

const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db("cse341").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getContactById = async (req, res, next) => {
 
  const contactId = req.params.id;

  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }

  const db = mongodb.getDb().db("cse341");
  const collection = db.collection('contacts');
  const result = await collection.findOne({ _id: new ObjectId(contactId) });

  if (!result) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(200).json(result);
   
};


// Create a contact
const createContact = async (req, res, next) => {

  const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  };
  
  const result = await mongodb.getDb().db("cse341").collection('contacts').insertOne(contact);

  if (result.acknowledged) {
      res.status(201).json(result); // 201 Created
  } else {
      res.status(500).json({ message: "Failed to insert contact" });
  }
  
};




const updateContact = async (req, res, next) => {
 
  const contactId = new ObjectId(req.params.id); 
  const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  };


  const result = await mongodb.getDb()
      .db("cse341")
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: updatedContact });

  if (result.modifiedCount > 0) {
      res.status(204).end(); // 204 Updated
  } else {
      res.status(404).json({ message: "Contact not found" });
  }
  
};

const deleteContact = async (req, res, next) => {
  
  const contactId = new ObjectId(req.params.id);

  const result = await mongodb.getDb()
      .db("cse341")
      .collection('contacts')
      .deleteOne({ _id: contactId });

  if (result.deletedCount > 0) {
      res.status(204).end(); // 204 Deleted
  } else {
      res.status(404).json({ message: "Contact not found" });
  }
  
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
