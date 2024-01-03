import { IsEnum, IsOptional } from 'class-validator';

export class RecipeFilterDto {
  @IsOptional()
  @IsEnum(['createdAt', 'title'])
  sortBy?: string = 'createdAt';
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
