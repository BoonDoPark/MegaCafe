import { Module } from '@nestjs/common';
import { BerverageController } from './berverage.controller';
import { BerverageService } from './berverage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './berverage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [BerverageController],
  providers: [BerverageService],
  exports: [BerverageService]
})
export class BerverageModule {}
