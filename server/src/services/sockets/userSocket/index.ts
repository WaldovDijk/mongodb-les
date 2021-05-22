import { Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import {
  Nsp,
  SocketService,
  SocketSession,
  Socket,
  Namespace,
  Input,
  Broadcast,
  Emit,
  Args,
} from '@tsed/socketio';
import { ChangeStream, ChangeEventUpdate, ObjectID } from 'mongodb';
import { User } from '../../../models/user';

@SocketService('/users')
export class UserSocket {
  @Inject(User)
  User: MongooseModel<User>;

  @Nsp nsp: Namespace;

  $onNamespaceInit(nsp: Namespace) {}

  $onConnection(@Socket socket: Socket, @SocketSession session: SocketSession) {
    console.log('someone connected');
    socket.emit('connection');
  }

  $onDisconnect(@Socket socket: Socket) {
    console.log('someone disconnected');
  }
}
