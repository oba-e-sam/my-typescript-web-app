import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Chat = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');

  // Mock chat data
  const chatRooms = [
    {
      id: '1',
      participants: [
        { id: '1', name: 'Sarah Johnson', role: 'agent', avatar: 'SJ' },
        { id: '2', name: 'John Doe', role: 'buyer', avatar: 'JD' }
      ],
      lastMessage: {
        id: '1',
        senderId: '1',
        message: 'The property viewing is scheduled for tomorrow at 2 PM.',
        timestamp: '2024-01-20T10:30:00Z',
        read: true
      },
      propertyId: '1'
    },
    {
      id: '2',
      participants: [
        { id: '3', name: 'Mike Davis', role: 'agent', avatar: 'MD' },
        { id: '2', name: 'John Doe', role: 'buyer', avatar: 'JD' }
      ],
      lastMessage: {
        id: '2',
        senderId: '3',
        message: 'I have some great properties that match your criteria.',
        timestamp: '2024-01-20T09:15:00Z',
        read: false
      }
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      receiverId: '2',
      message: 'Hi! I saw you\'re interested in the downtown apartment. Would you like to schedule a viewing?',
      timestamp: '2024-01-20T09:00:00Z',
      read: true
    },
    {
      id: '2',
      senderId: '2',
      receiverId: '1',
      message: 'Yes, I\'d love to see it! When would be a good time?',
      timestamp: '2024-01-20T09:05:00Z',
      read: true
    },
    {
      id: '3',
      senderId: '1',
      receiverId: '2',
      message: 'How about tomorrow at 2 PM? I can meet you at the property.',
      timestamp: '2024-01-20T09:10:00Z',
      read: true
    },
    {
      id: '4',
      senderId: '2',
      receiverId: '1',
      message: 'Perfect! I\'ll be there. Should I bring any documents?',
      timestamp: '2024-01-20T09:15:00Z',
      read: true
    },
    {
      id: '5',
      senderId: '1',
      receiverId: '2',
      message: 'The property viewing is scheduled for tomorrow at 2 PM. Just bring a valid ID and we can discuss any questions you have about the property.',
      timestamp: '2024-01-20T10:30:00Z',
      read: true
    }
  ];

  const selectedChatRoom = chatRooms.find(room => room.id === selectedChat);
  const otherParticipant = selectedChatRoom?.participants.find(p => p.id !== user?.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg h-screen flex">
          {/* Chat List Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chatRooms.map((room) => {
                const otherUser = room.participants.find(p => p.id !== user?.id);
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedChat(room.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === room.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {otherUser?.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {otherUser?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(room.lastMessage?.timestamp || '')}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {room.lastMessage?.message}
                        </p>
                        {!room.lastMessage?.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {otherParticipant?.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{otherParticipant?.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{otherParticipant?.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => {
                    const isOwnMessage = msg.senderId === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl chat-bubble ${
                            isOwnMessage
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;