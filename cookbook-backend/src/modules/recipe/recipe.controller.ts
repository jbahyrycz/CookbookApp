import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeNotFoundException } from '../../exceptions/recipe-not-found-exception';
import { EditRecipeDto } from './dto/edit-recipe.dto';
import { RecipeFilterDto } from './dto/recipe-filter.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Get()
  listRecipes(@Query() filter: RecipeFilterDto) {
    return this.recipeService.listRecipes(filter);
  }
  @Get(':id')
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipeService.get(id);
    if (!recipe) throw new RecipeNotFoundException();
    return recipe;
  }
  @Post()
  addRecipe(@Body() data: CreateRecipeDto) {
    return this.recipeService.addRecipe(data);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipeService.get(id);
    if (!recipe) throw new RecipeNotFoundException();
    await this.recipeService.deleteRecipe(id);
  }
  @Put(':id')
  async editRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditRecipeDto,
  ) {
    const recipe = await this.recipeService.get(id);
    if (!recipe) throw new RecipeNotFoundException();
    return this.recipeService.editRecipe(id, data);
  }
}
