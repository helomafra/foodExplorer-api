const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const PlatesController = require('../controllers/PlatesController');

const platesRoutes = Router();
const platesController = new PlatesController();

const upload = multer(uploadConfig.MULTER);

platesRoutes.post('/', upload.single('image'), platesController.create);
platesRoutes.get('/', platesController.index);
platesRoutes.get('/:id', platesController.show);
platesRoutes.delete('/:id', platesController.delete);
platesRoutes.put('/:id', upload.single('image'), platesController.update);

module.exports = platesRoutes;
