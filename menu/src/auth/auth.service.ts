import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Payload } from './payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async validate(payload: Payload) {}

    async generateAccessToken() {}

    async generateRefreshToken() {}
}
