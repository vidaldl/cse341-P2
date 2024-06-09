const routes = require('express').Router();
// Validator
const { validateCompany, validateCompanyId} = require('../validators/companyValidator');
const { validateCompanyIdParam } = require('../validators/vendingValidator');
const companiesController = require('../controllers/companiesController');
const vendingController = require('../controllers/vendingController');
const { handleValidationErrors } = require('../middleware/errorHandler');

// Controller


routes.get('/', companiesController.getCompanies);
routes.get('/:id', validateCompanyId, handleValidationErrors, companiesController.getCompanyById); 
routes.post('/', validateCompany, handleValidationErrors, companiesController.createCompany);
routes.put('/:id', [validateCompanyId, validateCompany], handleValidationErrors, companiesController.updateCompany);
routes.delete('/:id', validateCompanyId, handleValidationErrors, companiesController.deleteCompany);
routes.get('/:companyId/vending', validateCompanyIdParam, handleValidationErrors, vendingController.getVendingMachinesByCompanyId);


module.exports = routes;