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
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeNotFoundException } from '../../exceptions/recipe-not-found-exception';
import { EditRecipeDto } from './dto/edit-recipe.dto';
import { RecipeFilterDto } from './dto/recipe-filter.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Get()
  listRecipes(@Query() filter: RecipeFilterDto) {
    return this.recipeService.listRecipes(filter);
  }
  @Get('/my')
  @UseGuards(TokenGuard)
  listMyRecipes(@Query() filter: RecipeFilterDto, @UserID() userId: number) {
    return this.recipeService.listMyRecipes(filter, userId);
  }
  @Get(':id')
  @UseGuards(TokenGuard)
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipeService.get(id);
    if (!recipe) throw new RecipeNotFoundException();
    return recipe;
  }
  @Post()
  @UseGuards(TokenGuard)
  addRecipe(@Body() data: CreateRecipeDto, @UserID() userId: number) {
    return this.recipeService.addRecipe(data, userId);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(TokenGuard)
  async deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipeService.get(id);
    if (!recipe) throw new RecipeNotFoundException();
    await this.recipeService.deleteRecipe(id);
  }
  @Put(':id')
  @UseGuards(TokenGuard)
  async editRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditRecipeDto,
  ) {
    const recipe = await this.recipeService.get(id);
    if (!recipe) throw new RecipeNotFoundException();
    return this.recipeService.editRecipe(id, data);
  }
}
