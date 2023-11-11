import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { Berverage } from 'src/berverage/berverage.entity';
import { ReadCategoryDTO } from './dto/read-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Berverage) private berverageRepository: Repository<Berverage>,
    ) {}

    async createCategory(req: Category): Promise<void> {
        const exists = this.categoryRepository.findOne({where: {id: req.id}});
        if (exists) {
            throw new Error("Already Category. Please New Category");
        }
        await this.categoryRepository.save(this.categoryRepository.create(req));
    }

    async viewMenu(categoryId: number): Promise<ReadCategoryDTO> {
        const category = await this.categoryRepository.findOne({where: {id: categoryId}});
        const berverage = await this.berverageRepository.find({
            relations: {
                category: true,
        }})

        if (category.category.length <= 0) {
            throw new Error("error");
        };

        const readAllBerverage = berverage.map(v => {
            return {
                id: v.id,
                title: v.title,
                price: v.price,
                url: v.url
            }
        });
        return {
            id: category.id,
            category: category.category,
            berverage: readAllBerverage
        };
    }

    async updateCategory(id: number, req: UpdateCategoryDTO): Promise<void> {
        try {
            const category = await this.categoryRepository.findOne({where: {id: id}})
            if (req.category) {
                category.category = req.category;
            }
            await this.categoryRepository.save(category);
        } catch(error) {
            throw new Error("Not Update");
        }
    }

    async dropCategory(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
