import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  estimate: number;
  @IsString()
  @IsNotEmpty()
  content: string;
}
