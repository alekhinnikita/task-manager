import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TagModule],
  providers: [],
  controllers: [],
  exports: [TagModule],
})
export class ProjectModule {}
