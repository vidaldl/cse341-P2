const routes = require('express').Router();

const companiesController = require('../controllers/companiesController');

routes.get('/', companiesController.getCompanies);
routes.get('/:id', companiesController.getCompanyById); 
routes.post('/', companiesController.createCompany);
routes.put('/:id', companiesController.updateCompany);
routes.delete('/:id', companiesController.deleteCompany);

module.exports = routes;