import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EditRecipeDto } from './dto/edit-recipe.dto';
import { RecipeFilterDto } from './dto/recipe-filter.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}
  async listRecipes(filter: RecipeFilterDto) {
    return this.prisma.recipe.findMany({
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }
  async listMyRecipes(filter: RecipeFilterDto, userId: number) {
    const { sortBy, sortOrder } = filter;

    return this.prisma.recipe.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }
  get(id: number) {
    return this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });
  }
  async addRecipe(data: CreateRecipeDto, userId: number) {
    return this.prisma.recipe.create({
      data: {
        title: data.title,
        estimate: data.estimate,
        url: data.url,
        content: data.content,
        userId: userId,
      },
    });
  }

  editRecipe(id: number, data: EditRecipeDto) {
    return this.prisma.recipe.update({
      where: {
        id,
      },
      data: data,
    });
  }

  deleteRecipe(id: number) {
    return this.prisma.recipe.delete({
      where: {
        id,
      },
    });
  }
}
