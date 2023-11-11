import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ReadUserDTO } from './dto/read-user';
import { UpdateUserDTO } from './dto/update-user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}


    async fetchList(): Promise<ReadUserDTO[]> {
        const list = await this.userRepository.find();
        const parseList:ReadUserDTO[] = list.map((value) => {
            const returnObj:ReadUserDTO = {
                uid: value.id,
                email: value.email,
                userName: value.username,
                location: value.location,
                phone: value.phone,
            }
            return returnObj;
        })
        return parseList;
    }

    async fetchObject(id: number): Promise<ReadUserDTO> {
        const object = await this.userRepository.findOneBy({id: id});
        if (object === undefined)
            throw new NotFoundException(`Not found id : ${id}`);
        // console.log(object);
        return {
            uid: object.id,
            email: object.email,
            userName: object.username,
            location: object.location,
            phone: object.phone
        }  
    }

    async create(req: CreateUserDTO) {
        const newUser: User = this.userRepository.create({
            email: req.email,
            password: req.password,
            username: req.userName,
            location: req.location,
            phone: req.phone,
        })
        await this.userRepository.insert(newUser);
    }

    async drop(id: number): Promise<void> {
        console.log("success delete");
        await this.userRepository.delete(id);
    }

    async release(id: number, req: UpdateUserDTO): Promise<void> {
        await this.userRepository.update(id, {
            location: req.location,
            phone: req.phone,
        })
    }
}
