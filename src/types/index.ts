export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'agent' | 'company';
  avatar?: string;
  company?: string;
  phone?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial' | 'land';
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    lat: number;
    lng: number;
    city: string;
    state: string;
    zipCode: string;
  };
  images: string[];
  features: string[];
  agentId: string;
  agentName: string;
  agentContact: string;
  inspectionFee: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  propertyId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}