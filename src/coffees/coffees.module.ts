import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee/coffee.entity';
import { Flavour } from './entities/flavor/flavour.entity';

class MockCoffeeService { }
// Helps organize code relevant for a specific feature
// Clear boundaries for application and features
@Module({
    imports: [TypeOrmModule.forFeature([
        Coffee,
        Flavour,
        Event
    ])],
    controllers: [CoffeesController],
    providers: [{
        provide: CoffeesService,
        useValue: new MockCoffeeService()
    }],
    exports: [CoffeesService]
})
export class CoffeesModule { }
