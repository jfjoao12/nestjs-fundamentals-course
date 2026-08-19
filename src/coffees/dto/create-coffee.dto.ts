import { IsString } from "class-validator";

export class CreateCoffeeDto {
    @IsString()
    readonly name!: string;

    @IsString()
    readonly brand!: string;

    @IsString({ each: true }) // expects that each value is an array of string
    readonly flavours!: string[];
}
