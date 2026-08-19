import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

// Helps organize code relevant for a specific feature
// Clear boundaries for application and features
@Module({
    imports: [TypeOrmModule.forFeature([
        Coffee
    ])],
    controllers: [CoffeesController],
    providers: [CoffeesService],
})
export class CoffeesModule { }
