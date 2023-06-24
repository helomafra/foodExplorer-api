const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');

class PlatesController {
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const checkDishAlreadyExists = await knex('plates')
      .where({ title })
      .first();

    if (checkDishAlreadyExists) {
      throw new AppError('Este prato já existe no cardápio.');
    }

    const imageFileName = request.file.filename;
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imageFileName);

    const [plate_id] = await knex('plates').insert({
      image: filename,
      title,
      description,
      price,
      category
    });

    const hasOnlyOneIngredient = typeof ingredients === 'string';

    let ingredientsInsert;

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        plate_id
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((name) => {
        return {
          name,
          plate_id
        };
      });
    }

    await knex('ingredients').insert(ingredientsInsert);

    return response.status(201).json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients, image } =
      request.body;
    const { id } = request.params;

    const imageFileName = request.file.filename;

    const diskStorage = new DiskStorage();
    const plate = await knex('plates').where({ id }).first();

    if (plate.image) {
      await diskStorage.deleteFile(plate.image);
    }

    const filename = await diskStorage.saveFile(imageFileName);

    plate.image = image ?? filename;
    plate.title = title ?? plate.title;
    plate.description = description ?? plate.description;
    plate.category = category ?? plate.category;
    plate.price = price ?? plate.price;

    await knex('plates').where({ id }).update(plate);

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

    await knex('ingredients').where({ plate_id: id }).delete();
    await knex('ingredients').where({ plate_id: id }).insert(ingredientsInsert);

    return response.status(201).json('Prato atualizado com sucesso!');
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let plates;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim());

      plates = await knex('ingredients')
        .select([
          'plates.id',
          'plates.title',
          'plates.description',
          'plates.category',
          'plates.price',
          'plates.image'
        ])
        .whereLike('plates.title', `%${title}%`)
        .whereIn('name', filterIngredients)
        .innerJoin('plates', 'plates.id', 'ingredients.plate_id')
        .groupBy('plates.id')
        .orderBy('plates.title');
    } else {
      plates = await knex('plates')
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    const platesIngredients = await knex('ingredients');
    const platesWithIngredients = plates.map((dish) => {
      const plateIngredient = platesIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: plateIngredient
      };
    });

    return response.status(200).json(platesWithIngredients);
  }

  async show(request, response) {
    const { id } = request.params;

    const plate = await knex('plates').where({ id }).first();
    const ingredients = await knex('ingredients')
      .where({ plate_id: id })
      .orderBy('name');

    return response.json({
      ...plate,
      ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('plates').where({ id }).delete();

    return response.status(202).json();
  }
}

module.exports = PlatesController;
