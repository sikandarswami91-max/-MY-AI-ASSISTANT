import { Chat } from '../models/Chat.js';
import { Message } from '../models/Message.js';
import { ChatHistory } from '../models/ChatHistory.js';
import { aiService } from './aiService.js';

export class ChatService {
  async getChatsForUser(userId: string) {
    return await Chat.find({ userId }).sort({ updatedAt: -1 });
  }

  async getChatById(chatId: string, userId: string) {
    return await Chat.findOne({ _id: chatId, userId });
  }

  async createChat(userId: string, title?: string, category = 'General') {
    const chatTitle = title || `New Chat ${new Date().toLocaleDateString()}`;
    const chat = await Chat.create({
      userId,
      title: chatTitle,
      category,
      messagesCount: 0,
      preview: 'Conversation started...',
    });

    // Create history item
    await ChatHistory.create({
      userId,
      chatId: chat._id,
      title: chatTitle,
      category,
      dateGroup: 'Today',
      messageCount: 0,
    });

    return chat;
  }

  async getMessages(chatId: string) {
    return await Message.find({ chatId }).sort({ createdAt: 1 });
  }

  async postMessage(chatId: string, userId: string, content: string, attachments: any[] = []) {
    // 1. Save user message
    const userMsg = await Message.create({
      chatId,
      userId,
      role: 'user',
      content,
      attachments,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // 2. Generate AI response
    const aiResult = await aiService.generateText(content);

    // 3. Save assistant response
    const assistantMsg = await Message.create({
      chatId,
      userId,
      role: 'assistant',
      content: aiResult.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // 4. Update Chat summary
    await Chat.findByIdAndUpdate(chatId, {
      $inc: { messagesCount: 2 },
      preview: content.slice(0, 100),
      updatedAt: new Date(),
    });

    return {
      userMessage: userMsg,
      assistantMessage: assistantMsg,
    };
  }

  async deleteChat(chatId: string, userId: string) {
    await Message.deleteMany({ chatId });
    await ChatHistory.deleteMany({ chatId });
    return await Chat.findOneAndDelete({ _id: chatId, userId });
  }
}

export const chatService = new ChatService();
