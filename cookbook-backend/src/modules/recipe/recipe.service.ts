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
  get(id: number) {
    return this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });
  }
  async addRecipe(data: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        title: data.title,
        estimate: data.estimate,
        content: data.content,
        userId: 0,
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
