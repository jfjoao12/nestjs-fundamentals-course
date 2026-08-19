import { Coffee } from "src/coffees/entities/coffee/coffee.entity";
import { Flavour } from "src/coffees/entities/flavor/flavour.entity";
import { CoffeeRefactor1787171554568 } from "src/migrations/1787171554568-CoffeeRefactor";
import { SchemaSync1787172127909 } from "src/migrations/1787172127909-SchemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Coffee, Flavour],
    migrations: [CoffeeRefactor1787171554568, SchemaSync1787172127909],
});
