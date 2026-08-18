import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

// Responsible do data storage and retrieval
// Designed to be used by the Coffees controller
// or anything else that needs this controller
@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Café Extra Forte',
            brand: 'Pilão',
            flavours: ['Chocolate', 'Baunilha'],
        },
    ];

    findAll() {
        return this.coffees
    }

    findOne(id: string) {
        return this.coffees.find(item => item.id === +id)
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto)
    }

    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);

        if (existingCoffee) {
            // update the existing entity
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id)
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1)
        }
    }
}

