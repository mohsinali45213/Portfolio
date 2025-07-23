import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Eye, Trash2, Reply, Archive, Star } from 'lucide-react';

const ContactManager = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Project Collaboration",
      message: "Hi Mohsin, I'm interested in collaborating on a data science project. Would love to discuss further.",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "unread",
      starred: false,
      priority: "high"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      subject: "Job Opportunity",
      message: "We have an exciting opportunity for a Senior Data Scientist role at our company. Are you interested?",
      date: "2024-01-14",
      time: "2:15 PM",
      status: "read",
      starred: true,
      priority: "high"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@startup.io",
      subject: "Consulting Work",
      message: "Looking for a data science consultant for our startup. Your portfolio looks impressive!",
      date: "2024-01-13",
      time: "4:45 PM",
      status: "replied",
      starred: false,
      priority: "medium"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [contactInfo, setContactInfo] = useState({
    email: 'mohsin.ali@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    availability: 'Available for new projects'
  });

  const handleMessageAction = (id: number, action: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === id) {
        switch (action) {
          case 'read':
            return { ...msg, status: 'read' };
          case 'star':
            return { ...msg, starred: !msg.starred };
          case 'archive':
            return { ...msg, status: 'archived' };
          case 'delete':
            return null;
          default:
            return msg;
        }
      }
      return msg;
    }).filter(Boolean) as any[]);
    
    if (action === 'delete') {
      setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(msg => {
    switch (filter) {
      case 'unread':
        return msg.status === 'unread';
      case 'starred':
        return msg.starred;
      case 'archived':
        return msg.status === 'archived';
      default:
        return msg.status !== 'archived';
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'text-blue-400';
      case 'read':
        return 'text-green-400';
      case 'replied':
        return 'text-purple-400';
      case 'archived':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Contact Management</h2>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="starred">Starred</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-cyan-400" />
              <div>
                <div className="text-white/60 text-sm">Email</div>
                <div className="text-white">{contactInfo.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-green-400" />
              <div>
                <div className="text-white/60 text-sm">Phone</div>
                <div className="text-white">{contactInfo.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-purple-400" />
              <div>
                <div className="text-white/60 text-sm">Location</div>
                <div className="text-white">{contactInfo.location}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
            <div className="text-green-400 font-medium mb-1">Status</div>
            <div className="text-white text-sm">{contactInfo.availability}</div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Messages</h3>
            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
              {filteredMessages.length}
            </span>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'unread') {
                    handleMessageAction(message.id, 'read');
                  }
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  message.status === 'unread' 
                    ? 'bg-blue-500/10 border-blue-500/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                } ${selectedMessage?.id === message.id ? 'ring-2 ring-cyan-400' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium">{message.name}</h4>
                    {message.starred && <Star size={14} className="text-yellow-400 fill-current" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(message.priority)} bg-current/20`}>
                      {message.priority}
                    </span>
                    <span className={`text-xs ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
                <div className="text-white/70 text-sm mb-2">{message.subject}</div>
                <div className="text-white/60 text-xs">{message.date} at {message.time}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          {selectedMessage ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Message Details</h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleMessageAction(selectedMessage.id, 'star')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedMessage.starred 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-white/10 text-white/60 hover:text-yellow-400'
                    }`}
                  >
                    <Star size={16} className={selectedMessage.starred ? 'fill-current' : ''} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleMessageAction(selectedMessage.id, 'archive')}
                    className="bg-white/10 text-white/60 p-2 rounded-lg hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <Archive size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleMessageAction(selectedMessage.id, 'delete')}
                    className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-white/60 text-sm mb-1">From</div>
                  <div className="text-white font-medium">{selectedMessage.name}</div>
                  <div className="text-white/70 text-sm">{selectedMessage.email}</div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-1">Subject</div>
                  <div className="text-white font-medium">{selectedMessage.subject}</div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-1">Date</div>
                  <div className="text-white/80">{selectedMessage.date} at {selectedMessage.time}</div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-2">Message</div>
                  <div className="bg-white/5 rounded-xl p-4 text-white/80 leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Reply size={16} />
                    Reply
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    Forward
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-white/60 py-12">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {messages.filter(m => m.status === 'unread').length}
          </div>
          <div className="text-white/70 text-sm">Unread</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {messages.filter(m => m.starred).length}
          </div>
          <div className="text-white/70 text-sm">Starred</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {messages.filter(m => m.status === 'replied').length}
          </div>
          <div className="text-white/70 text-sm">Replied</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
          <div className="text-2xl font-bold text-cyan-400 mb-1">
            {messages.length}
          </div>
          <div className="text-white/70 text-sm">Total</div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;