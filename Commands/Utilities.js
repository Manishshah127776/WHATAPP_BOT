const axios = require('axios');
const fs = require('fs');
const gTTS = require('gtts');
const wiki = require('wikipedia');

module.exports = {
  // Create Sticker
  async sticker(sock, msg, args) {
    if (!msg.message.imageMessage) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please reply to an image with .sticker' 
      });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🔄 Creating sticker...' 
    });

    try {
      const buffer = await downloadMediaMessage(msg, 'buffer');
      await sock.sendMessage(msg.key.remoteJid, { 
        sticker: buffer 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to create sticker' 
      });
    }
  },

  // Text to Speech
  async tts(sock, msg, args) {
    const text = args.join(' ');
    if (!text) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide text\nExample: .tts Hello World' 
      });
      return;
    }

    try {
      const gtts = new gTTS(text, 'en');
      const audioPath = `./tmp/tts_${Date.now()}.mp3`;
      
      gtts.save(audioPath, async function(err) {
        if (err) throw err;
        
        const audioBuffer = fs.readFileSync(audioPath);
        await sock.sendMessage(msg.key.remoteJid, { 
          audio: audioBuffer,
          mimetype: 'audio/mp4',
          ptt: true
        });
        
        fs.unlinkSync(audioPath);
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to generate speech' 
      });
    }
  },

  // Wikipedia Search
  async wikipedia(sock, msg, args) {
    const query = args.join(' ');
    if (!query) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide search term\nExample: .wiki Albert Einstein' 
      });
      return;
    }

    try {
      const page = await wiki.page(query);
      const summary = await page.summary();
      
      const info = `📚 *Wikipedia: ${summary.title}*\n\n${summary.extract.substring(0, 500)}...\n\n🔗 Read more: ${summary.content_urls.desktop.page}`;
      
      await sock.sendMessage(msg.key.remoteJid, { text: info });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ No results found' 
      });
    }
  },

  // Emoji Mixer
  async emoji(sock, msg, args) {
    const emojis = args.join(' ');
    if (!emojis) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide emojis\nExample: .emoji 😊 ❤️' 
      });
      return;
    }

    // Simple emoji mix - combine them
    const mixed = emojis.replace(/\s+/g, '');
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `🎨 *Mixed Emoji:* ${mixed}\n\nOriginal: ${emojis}` 
    });
  },

  // Ban User (Admin only)
  async ban(sock, msg, args) {
    const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    
    if (!target) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please mention user to ban\nExample: .ban @user' 
      });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, { 
      text: `@${target.split('@')[0]} has been banned from using bot commands!`,
      mentions: [target]
    });
  },

  // Group Info
  async groupinfo(sock, msg, args) {
    const groupMetadata = await sock.groupMetadata(msg.key.remoteJid);
    
    const info = `👥 *Group Information*
📝 Name: ${groupMetadata.subject}
🆔 ID: ${groupMetadata.id}
👤 Created by: ${groupMetadata.owner || 'Unknown'}
📅 Created: ${new Date(groupMetadata.creation).toLocaleDateString()}
👥 Members: ${groupMetadata.participants.length}
👑 Admins: ${groupMetadata.participants.filter(p => p.admin).length}
🔒 Restrict: ${groupMetadata.restrict ? 'Yes' : 'No'}
🔓 Announce: ${groupMetadata.announce ? 'Yes' : 'No'}`;

    await sock.sendMessage(msg.key.remoteJid, { text: info });
  },

  // Generic utility
  async generic(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '⚙️ Utility feature coming soon!' 
    });
  },

  // Admin generic
  async adminGeneric(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '👑 Admin feature coming soon!' 
    });
  }
};
