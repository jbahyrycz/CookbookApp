import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './modules/recipe/recipe.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [RecipeModule],
})
export class AppModule {}
