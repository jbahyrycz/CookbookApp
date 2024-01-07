import { NotFoundException } from '@nestjs/common';

export class IngredientNotFoundException extends NotFoundException {
  constructor() {
    super('Ingredient not found');
  }
}
