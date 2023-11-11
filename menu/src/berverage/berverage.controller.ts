import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { BerverageService } from './berverage.service';
import { Berverage } from './berverage.entity';
import { UpdateBerverageDTO } from './dto/update-menu';

@Controller('berverage')
export class BerverageController {
    constructor(private berverageSevice: BerverageService) {}

    @Post('/create')
    async createMenu(@Body() req: Berverage): Promise<void> {
            await this.berverageSevice.create(req);
        }

    @Patch('/update/:id')
    async updateUser(@Param('id') id: number, @Body() req: UpdateBerverageDTO): Promise<void> {
        await this.berverageSevice.update(id, req);
    }

    @Delete('/delete/:id')
    deleteMenu(@Param('id') id: number): Promise<void> {
        return this.berverageSevice.drop(id);
    }
}
