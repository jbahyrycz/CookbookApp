import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  listRecipe() {
    return [
      {
        title: 'test',
        estimate: 20,
        content: 'Aaaaaaaaaaaaaaaaaaaaa bbbbb cccccccc.',
      },
    ];
  }
  addRecipe(data: CreateRecipeDto) {
    return data;
  }
  editRecipe() {}
  deleteRecipe() {}
}
