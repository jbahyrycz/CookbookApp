import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Get()
  ListRecipe() {
    return this.recipeService.listRecipe();
  }
  @Post()
  AddRecipe(@Body() data: CreateRecipeDto) {
    return this.recipeService.addRecipe(data);
  }
}
