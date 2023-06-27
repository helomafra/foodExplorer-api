const knex = require('../database/knex');

class PlatesRepository {
  async findPlateByTitle(title) {
    return knex('plates').where({ title }).first();
  }

  async createPlate(plate) {
    const [plateId] = await knex('plates').insert(plate);

    return plateId;
  }

  async insertIngredients(plateId, ingredients) {
    await knex('ingredients').insert(ingredients);
  }

  async findPlateById(id) {
    return knex('plates').where({ id }).first();
  }

  async updatePlate(id, plate) {
    await knex('plates').where({ id }).update(plate);
  }

  async deleteIngredientsByPlateId(id) {
    await knex('ingredients').where({ plate_id: id }).delete();
  }

  async findPlatesByTitle(title) {
    return knex('plates').where('title', 'like', `%${title}%`).orderBy('title');
  }

  async findPlatesByTitleAndIngredients(title, ingredientName) {
    return knex('plates')
      .select([
        'plates.id',
        'plates.title',
        'plates.description',
        'plates.category',
        'plates.price',
        'plates.image'
      ])
      .leftJoin('ingredients', 'plates.id', 'ingredients.plate_id')
      .where(function () {
        this.where('plates.title', 'like', `%${title}%`).orWhere(function () {
          this.where(
            'ingredients.name',
            'like',
            `%${ingredientName}%`
          ).andWhereNotNull('plates.id');
        });
      })
      .groupBy('plates.id')
      .orderBy('plates.title');
  }

  async findIngredientsByPlateId(id) {
    return knex('ingredients').where({ plate_id: id }).orderBy('name');
  }

  async deletePlate(id) {
    await knex('plates').where({ id }).delete();
  }
}

module.exports = PlatesRepository;
