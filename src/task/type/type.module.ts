import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
@Module({
  providers: [TypeService],
  controllers: [TypeController],
})
export class TypeModule {}
