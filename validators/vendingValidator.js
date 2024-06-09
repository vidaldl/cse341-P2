const { body, param } = require('express-validator');
const { ObjectId } = require('mongodb');

const validateVendingMachine = [
  body('address').notEmpty().withMessage('Address is required'),
  body('lat').isFloat().withMessage('Valid latitude is required'),
  body('long').isFloat().withMessage('Valid longitude is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('status').notEmpty().withMessage('Status is required'),
  body('companyId').custom(value => {
    if (!ObjectId.isValid(value)) {
      throw new Error('Invalid company ID');
    }
    return true;
  }).withMessage('Invalid company ID')
];

const validateVendingMachineId = [
  param('id').custom(value => {
    if (!ObjectId.isValid(value)) {
      throw new Error('Invalid vending machine ID');
    }
    return true;
  }).withMessage('Invalid vending machine ID')
];

const validateCompanyIdParam = [
  param('companyId').custom(value => {
    if (!ObjectId.isValid(value)) {
      throw new Error('Invalid company ID');
    }
    return true;
  }).withMessage('Invalid company ID')
];

module.exports = {
  validateVendingMachine,
  validateVendingMachineId,
  validateCompanyIdParam
};