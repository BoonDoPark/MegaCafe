import { Module } from '@nestjs/common';
import { BerverageModule } from './berverage/berverage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/TypeConfig';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    BerverageModule, 
    TypeOrmModule.forRoot(TypeOrmConfig), UserModule, CategoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
