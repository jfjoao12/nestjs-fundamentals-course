import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "../coffee/coffee.entity";

@Entity()
export class Flavour {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @JoinTable()
    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavours,
    )
    coffees!: Flavour[]
}
