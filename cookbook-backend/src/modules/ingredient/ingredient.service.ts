import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { EditIngredientDto } from './dto/edit-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}
  async listIngredients() {
    return this.prisma.ingredient.findMany();
  }
  async listIngredientsByRecipe(recipeId: number) {
    return this.prisma.ingredient.findMany({
      where: {
        recipeId: recipeId,
      },
    });
  }
  get(id: number) {
    return this.prisma.ingredient.findUnique({
      where: {
        id,
      },
    });
  }
  async addIngredient(data: CreateIngredientDto, recipeId: number) {
    return this.prisma.ingredient.create({
      data: {
        content: data.content,
        recipeId: recipeId,
      },
    });
  }
  editIngredient(id: number, data: EditIngredientDto) {
    return this.prisma.ingredient.update({
      where: {
        id,
      },
      data: data,
    });
  }
  deleteIngredient(id: number) {
    return this.prisma.ingredient.delete({
      where: {
        id,
      },
    });
  }
}
