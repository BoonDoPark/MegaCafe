import { Berverage } from "src/berverage/berverage.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @OneToMany(type => Berverage, berverage => berverage.category)
    berverage: Berverage;
}