import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateCalcModule } from './modules/rate-calc/rate-calc.module';

@Module({
  imports: [RateCalcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
