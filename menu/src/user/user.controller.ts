import { Body, Controller, Delete, Get, Param, Put, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDTO } from './dto/read-user';
import { UpdateUserDTO } from './dto/update-user';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userSevice: UserService) {}


    @Get('/fetchList')
    async fatchList(): Promise<ReadUserDTO[]> {
        return this.userSevice.fetchList();
    }

    @Get('/fetchObject/:id')
    async fetchObject(@Param('id') id: number): Promise<ReadUserDTO> {
        return this.userSevice.fetchObject(id);
    }

    @Post()
    async createUser(@Body() req: User): Promise<void> {
            await this.userSevice.create(req);
    }

    @Delete('/deleteObject/:id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userSevice.drop(id);
    }

    @Put('/patchObject/:id')
    async updateUser(@Param('id') id: number, @Body() req: UpdateUserDTO): Promise<void> {
        await this.userSevice.release(id, req);
    }
}
