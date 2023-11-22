import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ReadUserDTO } from './dto/read-user';
import { UpdateUserDTO } from './dto/update-user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}


    async fetchList(): Promise<ReadUserDTO[]> {
        const user = await this.userRepository.find();
        const parseUser:ReadUserDTO[] = user.map((value) => {
            return {
                uid: value.id,
                email: value.email,
                userName: value.username,
                location: value.location,
                phone: value.phone,
            };
        })
        return parseUser;
    }

    async fetchObject(id: number): Promise<ReadUserDTO> {
        const user = await this.userRepository.findOneBy({id: id});
        if (user === undefined)
            throw new NotFoundException(`Not found id : ${id}`);
        
        return {
            uid: user.id,
            email: user.email,
            userName: user.username,
            location: user.location,
            phone: user.phone
        }  
    }

    async create(req: User) {
        const newUser = this.userRepository.create({
            email: req.email,
            password: req.password,
            username: req.username,
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
