const AppError = require('../utils/AppError');
const PlatesService = require('../services/PlatesService');

class PlatesController {
  static platesService = new PlatesService();

  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;
    const imageFileName = request.file.filename;

    await PlatesController.platesService.createPlate(
      title,
      description,
      category,
      price,
      ingredients,
      imageFileName
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients, image } =
      request.body;
    const { id } = request.params;
    const imageFileName = request.file.filename;

    await PlatesController.platesService.updatePlate(
      id,
      title,
      description,
      category,
      price,
      ingredients,
      image,
      imageFileName
    );

    return response.status(200).json('Prato atualizado com sucesso!');
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    const plates =
      await PlatesController.platesService.getPlatesByTitleAndIngredients(
        title,
        ingredients
      );

    return response.status(200).json(plates);
  }

  async show(request, response) {
    const { id } = request.params;

    const plate = await PlatesController.platesService.getPlateById(id);

    return response.json(plate);
  }

  async delete(request, response) {
    const { id } = request.params;

    await PlatesController.platesService.deletePlate(id);

    return response.status(202).json();
  }
}

module.exports = PlatesController;
