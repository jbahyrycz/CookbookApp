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
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientNotFoundException } from '../../exceptions/ingredient-not-found-exception';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { EditIngredientDto } from './dto/edit-ingredient.dto';
import { TokenGuard } from '../auth/token.guard';

@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}
  @Get()
  @UseGuards(TokenGuard)
  listIngredients() {
    return this.ingredientService.listIngredients();
  }

  @Get('recipe/:recipeId')
  @UseGuards(TokenGuard)
  listIngredientByRecipe(@Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.ingredientService.listIngredientsByRecipe(recipeId);
  }
  @Get(':id')
  @UseGuards(TokenGuard)
  async getIngredient(@Param('id', ParseIntPipe) id: number) {
    const ingredient = await this.ingredientService.get(id);
    if (!ingredient) throw new IngredientNotFoundException();
    return ingredient;
  }
  @Post('recipe/:recipeId')
  @UseGuards(TokenGuard)
  addIngredient(
    @Body() data: CreateIngredientDto,
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.ingredientService.addIngredient(data, recipeId);
  }
  @Delete(':id')
  @UseGuards(TokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteIngredient(@Param('id', ParseIntPipe) id: number) {
    const ingredient = await this.ingredientService.get(id);
    if (!ingredient) throw new IngredientNotFoundException();
    await this.ingredientService.deleteIngredient(id);
  }
  @Put(':id')
  @UseGuards(TokenGuard)
  async editIngredient(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditIngredientDto,
  ) {
    const ingredient = await this.ingredientService.get(id);
    if (!ingredient) throw new IngredientNotFoundException();
    return this.ingredientService.editIngredient(id, data);
  }
}
