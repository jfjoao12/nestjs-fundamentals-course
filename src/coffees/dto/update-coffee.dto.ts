import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "./create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) { }
// Returning the class passed to PartialType with all the fields as optionals
// Also inheritts all the validations rules applied via the decorators on the fly
