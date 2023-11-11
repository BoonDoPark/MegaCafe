import { Category } from "src/category/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Berverage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({default: 0})
    price: number;

    @Column({nullable: true})
    url: string;

    @ManyToOne(type => Category, category => category.berverage)
    category: Category;

}