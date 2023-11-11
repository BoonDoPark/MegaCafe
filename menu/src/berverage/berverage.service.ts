import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Berverage } from './berverage.entity';
import { Repository } from 'typeorm';
import { UpdateBerverageDTO } from './dto/update-menu';

@Injectable()
export class BerverageService {
    constructor(
        @InjectRepository(Berverage)
        private berverageRepository: Repository<Berverage>,
    ) {}

    async create(req: Berverage): Promise<void> {
        const exists = await this.berverageRepository.findOne({where: {id: req.id}});
        if (exists) {
            throw new Error('Already Berverage');
        }
        await this.berverageRepository.save(this.berverageRepository.create(req));
    }

    async viewBerverage(id: number) {
        return ;
    }

    async update(id: number, req: UpdateBerverageDTO): Promise<void> {
        try{
            const berverage = await this.berverageRepository.findOne({where: {id: id}});
            await this.berverageRepository.save(berverage);
        } catch(error) {
            throw new Error('error')
        }
    }

    async drop(id: number): Promise<void> {
        console.log("success delete");
        await this.berverageRepository.delete(id);
    }
}
