import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavour } from './entities/flavor/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';

// Responsible do data storage and retrieval
// Designed to be used by the Coffees controller
// or anything else that needs this controller
@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private readonly flavourRepository: Repository<Flavour>,
        private readonly dataSource: DataSource
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery
        return this.coffeeRepository.find({
            relations: {
                flavours: true
            },
            skip: offset,
            take: limit
        })
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                flavours: true
            }
        })
        if (!coffee) {
            throw new NotFoundException(`Coffee ${id} not found`)
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavours = await Promise.all(
            createCoffeeDto.flavours.map(name => this.preloadFlavourByName(name))
        )

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavours,
        })
        return this.coffeeRepository.save(coffee)
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavours = updateCoffeeDto.flavours && (await Promise.all(
            updateCoffeeDto.flavours.map(name => this.preloadFlavourByName(name))
        ))

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavours
        })
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return this.coffeeRepository.save(coffee)
    }

    async remove(id: string) {
        const coffee = await this.findOne(id)
        return this.coffeeRepository.remove(coffee)
    }

    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            coffee.recommendations++;

            const recommendEvent = new Event()

            recommendEvent.name = 'recomment_coffee'
            recommendEvent.type = 'coffee'
            recommendEvent.payload = { coffeeId: coffee.id }

            await queryRunner.manager.save(coffee)
            await queryRunner.manager.save(recommendEvent)

            await queryRunner.commitTransaction()
        } catch (err) {
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }
    }

    private async preloadFlavourByName(name: string): Promise<Flavour> {
        const existingFlavour = await this.flavourRepository.findOne({
            where: { name },
        })
        if (existingFlavour) {
            return existingFlavour
        }
        return this.flavourRepository.create({ name })
    }
}

