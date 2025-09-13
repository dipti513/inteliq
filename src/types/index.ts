export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AppState {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  sidebarOpen: boolean;
}