import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// Helps organize code relevant for a specific feature
// Clear boundaries for application and features
@Module({
    controllers: [CoffeesController],
    providers: [CoffeesService],
})
export class CoffeesModule { }
