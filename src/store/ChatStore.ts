import { create } from 'zustand';
import { AppState, Chat, Message, SuggestionCard } from '../types';

interface ChatStore extends AppState {
  model: string;
  setModel: (model: string) => void;
  // Actions
  createNewChat: () => void;
  selectChat: (chatId: string | null) => void; // Changed to allow null
  addMessage: (chatId: string, content: string, role: 'user' | 'assistant') => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  // Getters
  getCurrentChat: () => Chat | null;
  getSuggestions: () => SuggestionCard[];
}
const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultSuggestions: SuggestionCard[] = [
  {
    id: '1',
    title: 'Give me a concise summary of this meeting transcript',
    description: 'Summarize key points and action items',
    icon: '📝'
  },
  {
    id: '2',
    title: 'Write a product description for a minimalist smartwatch',
    description: 'Create compelling marketing copy',
    icon: '⌚'
  },
  {
    id: '3',
    title: 'Provide a polite response to a customer asking for a refund',
    description: 'Professional customer service reply',
    icon: '💬'
  }
];

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChatId: null,
  isLoading: false,
  sidebarOpen: false,
  model: 'ChatGPT 4',
  setModel: (model: any) => set({ model }),
  

  createNewChat: () => {
    const newChat: Chat = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    set(state => ({
      chats: [newChat, ...state.chats],
      currentChatId: newChat.id
    }));
  },

  selectChat: (chatId: string | null) => { // Changed to allow null
    set({ currentChatId: chatId });
  },

  addMessage: (chatId: string, content: string, role: 'user' | 'assistant') => {
    const message: Message = {
      id: generateId(),
      content,
      role,
      timestamp: new Date()
    };

    set(state => ({
      chats: state.chats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, message],
              title: chat.messages.length === 0 ? content.slice(0, 30) + '...' : chat.title,
              updatedAt: new Date()
            }
          : chat
      )
    }));
  },

  toggleSidebar: () => {
    set(state => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  getCurrentChat: () => {
    const state = get();
    return state.chats.find(chat => chat.id === state.currentChatId) || null;
  },

  getSuggestions: () => defaultSuggestions
}));