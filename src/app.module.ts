import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { ItemsModule } from './items/items.module';
//import { HealthModule } from './health/health.module';
import { CalculoModule } from './operacion/calculo/calculo.module';

@Module({
  //imports: [ItemsModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
  imports: [CalculoModule],
})
export class AppModule {}
