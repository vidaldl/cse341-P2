const routes = require('express').Router();
const vendingController = require('../controllers/vendingController');
const { validateVendingMachine, validateVendingMachineId } = require('../validators/vendingValidator');
const { handleValidationErrors } = require('../middleware/errorHandler');

routes.get('/', vendingController.getVendingMachines);
routes.get('/:id', validateVendingMachineId, handleValidationErrors, vendingController.getVendingMachineById);
routes.post('/', validateVendingMachine, handleValidationErrors, vendingController.createVendingMachine);
routes.put('/:id', [validateVendingMachineId, validateVendingMachine], handleValidationErrors, vendingController.updateVendingMachine);
routes.delete('/:id', validateVendingMachineId, handleValidationErrors, vendingController.deleteVendingMachine);

module.exports = routes;