import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  estimate: number;
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}
