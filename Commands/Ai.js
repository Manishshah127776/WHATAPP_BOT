const axios = require('axios');

module.exports = {
  // AI Chat (using free API)
  async chat(sock, msg, args) {
    const query = args.join(' ');
    if (!query) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide a message\nExample: .ai What is love?' 
      });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🤔 Thinking...' 
    });

    try {
      // Using free API (replace with your preferred free AI API)
      const response = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(query)}&botname=Lucifer&ownername=Manish`);
      
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🤖 *AI Response:*\n${response.data.message}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ AI service unavailable' 
      });
    }
  },

  // Image Generation (placeholder)
  async imagine(sock, msg, args) {
    const prompt = args.join(' ');
    if (!prompt) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide a prompt\nExample: .imagine beautiful sunset' 
      });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🎨 Generating image... This may take a moment' 
    });

    // Placeholder - add actual image generation API
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '⚠️ Image generation feature coming soon!' 
    });
  },

  // Sentiment Analysis
  async sentiment(sock, msg, args) {
    const text = args.join(' ');
    if (!text) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide text to analyze' 
      });
      return;
    }

    // Simple sentiment analysis
    const positiveWords = ['good', 'great', 'awesome', 'excellent', 'happy', 'love'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry'];
    
    const words = text.toLowerCase().split(' ');
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score++;
      if (negativeWords.includes(word)) score--;
    });

    let sentiment = 'Neutral';
    if (score > 0) sentiment = 'Positive 😊';
    if (score < 0) sentiment = 'Negative 😞';

    await sock.sendMessage(msg.key.remoteJid, { 
      text: `📊 *Sentiment Analysis*
Text: "${text}"
Sentiment: ${sentiment}
Score: ${score}` 
    });
  },

  // Generic AI
  async generic(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🤖 AI feature coming soon!' 
    });
  }
};
