import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [RecipeModule, PrismaModule],
})
export class AppModule {}
