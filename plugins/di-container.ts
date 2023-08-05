import 'reflect-metadata';
import { ChatRepository, IChatRepository } from '../repository/chatRepository';
import { container } from 'tsyringe';
import {
  ChatMessageDataSource,
  IChatMessageDataSource,
} from '../service/chatMessageDataSource';

export default defineNuxtPlugin((nuxtApp) => {
  container.register<IChatRepository>('IChatRepository', {
    useClass: ChatRepository,
  });
  container.register<IChatMessageDataSource>('IChatMessageDataSource', {
    useClass: ChatMessageDataSource,
  });
});
