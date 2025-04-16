import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService){}

    getMongoDbUrl() {
        return this.configService.get<string>('MONGO_URL') || 'mongodb://localhost:27017/testDb';
    }
}
