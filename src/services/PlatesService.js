const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');
const PlatesRepository = require('../repositories/PlatesRepository');

class PlatesService {
  constructor() {
    this.platesRepository = new PlatesRepository();
  }

  async createPlate(
    title,
    description,
    category,
    price,
    ingredients,
    imageFileName
  ) {
    const { platesRepository } = this;

    const checkIfDishAlreadyExists = await platesRepository.findPlateByTitle(
      title
    );

    if (checkIfDishAlreadyExists) {
      throw new AppError('Ops! Este prato já existe no cardápio.');
    }

    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imageFileName);

    const plate = {
      image: filename,
      title,
      description,
      price,
      category
    };

    const plateId = await platesRepository.createPlate(plate);

    const hasOnlyOneIngredient = typeof ingredients === 'string';

    let ingredientsInsert;

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        plate_id: plateId
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((ingredient) => {
        return {
          plate_id: plateId,
          name: ingredient
        };
      });
    }

    await platesRepository.insertIngredients(plateId, ingredientsInsert);
  }

  async updatePlate(
    id,
    title,
    description,
    category,
    price,
    ingredients,
    image,
    imageFileName
  ) {
    const { platesRepository } = this;
    const diskStorage = new DiskStorage();
    const plate = await platesRepository.findPlateById(id);

    if (plate.image) {
      await diskStorage.deleteFile(plate.image);
    }

    const filename = await diskStorage.saveFile(imageFileName);

    plate.image = image || filename;
    plate.title = title || plate.title;
    plate.description = description || plate.description;
    plate.category = category || plate.category;
    plate.price = price || plate.price;

    await platesRepository.updatePlate(id, plate);

    const hasOnlyOneIngredient = typeof ingredients === 'string';

    let ingredientsInsert;

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        plate_id: plate.id
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((ingredient) => {
        return {
          plate_id: plate.id,
          name: ingredient
        };
      });
    }

    await platesRepository.deleteIngredientsByPlateId(id);
    await platesRepository.insertIngredients(id, ingredientsInsert);
  }

  async getPlatesByTitleAndIngredients(title, ingredients) {
    const { platesRepository } = this;

    let plates;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim());

      plates = await platesRepository.findPlatesByTitleAndIngredients(
        title,
        filterIngredients
      );
    } else {
      plates = await platesRepository.findPlatesByTitle(title);
    }

    const platesWithIngredients = [];

    for (const plate of plates) {
      const plateIngredients = await platesRepository.findIngredientsByPlateId(
        plate.id
      );
      platesWithIngredients.push({ ...plate, ingredients: plateIngredients });
    }

    return platesWithIngredients;
  }

  async getPlateById(id) {
    const { platesRepository } = this;
    const plate = await platesRepository.findPlateById(id);
    const ingredients = await platesRepository.findIngredientsByPlateId(id);

    return { ...plate, ingredients };
  }

  async deletePlate(id) {
    const { platesRepository } = this;
    await platesRepository.deletePlate(id);
  }
}

module.exports = PlatesService;
