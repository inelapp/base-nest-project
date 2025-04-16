import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        TestModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URL') || 'mongodb://localhost:27017/testDb',
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AppService],
})
export class AppModule {}
