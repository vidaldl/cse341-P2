const { body, param } = require('express-validator');
const { ObjectId } = require('mongodb');

const validateCompany = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('email').isEmail().withMessage('Valid email is required')
];

const validateCompanyId = [
    param('id').custom(value => {
        if (!ObjectId.isValid(value)) {
          throw new Error('Invalid company ID');
        }
        return true;
      })
];

module.exports = {
  validateCompany,
  validateCompanyId
};