import { NotFoundException } from '@nestjs/common';

export class RecipeNotFoundException extends NotFoundException {
  constructor() {
    super('Recipe not found');
  }
}
