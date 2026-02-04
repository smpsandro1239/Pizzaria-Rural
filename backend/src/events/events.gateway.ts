import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Cliente ligado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desligado: ${client.id}`);
  }

  @SubscribeMessage('joinOrder')
  handleJoinOrder(client: Socket, orderId: string) {
    client.join(`order_${orderId}`);
    this.logger.log(`Cliente ${client.id} entrou na sala da encomenda ${orderId}`);
    return { event: 'joined', data: orderId };
  }

  emitOrderStatusUpdate(orderId: string, status: string) {
    this.server.to(`order_${orderId}`).emit('orderStatusUpdated', { orderId, status });
    this.logger.log(`Evento de atualização emitido para encomenda ${orderId}: ${status}`);
  }
}
