import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { OrdersController } from './controllers/orders/orders.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
