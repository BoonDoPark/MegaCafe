import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { ReadCategoryDTO } from './dto/read-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Post('/create')
    async createCategory(@Body() req: Category): Promise<void> {
        await this.categoryService.createCategory(req);
    }

    @Get("/:id")
    async readCategory(@Param("id") id: number): Promise<ReadCategoryDTO> {
        return this.categoryService.viewMenu(id);
    }

    @Patch('/update/:id')
    async updateCategory(@Param('id') id: number, @Body() req: UpdateCategoryDTO): Promise<void> {
        await this.categoryService.updateCategory(id, req);
    }

    @Delete('/delete/:id')
    async dropCategory(@Param('id') id: number): Promise<void> {
        await this.categoryService.dropCategory(id);
    }
}
