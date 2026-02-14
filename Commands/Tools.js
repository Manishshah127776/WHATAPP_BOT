const math = require('mathjs');
const weather = require('weather-js');
const qrcode = require('qrcode');
const axios = require('axios');

module.exports = {
  // Calculator
  async calculator(sock, msg, args) {
    const expression = args.join(' ');
    if (!expression) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide an expression\nExample: .calc 2+2' 
      });
      return;
    }

    try {
      const result = math.evaluate(expression);
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🔢 *Result:* ${expression} = ${result}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Invalid mathematical expression' 
      });
    }
  },

  // Weather Info
  async weather(sock, msg, args) {
    const city = args.join(' ');
    if (!city) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide city name\nExample: .weather London' 
      });
      return;
    }

    weather.find({ search: city, degreeType: 'C' }, async (err, result) => {
      if (err || !result || result.length === 0) {
        await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ City not found' 
        });
        return;
      }

      const data = result[0];
      const weatherInfo = `🌍 *Weather in ${data.location.name}*
🌡️ Temperature: ${data.current.temperature}°C
🤔 Feels like: ${data.current.feelslike}°C
💧 Humidity: ${data.current.humidity}%
💨 Wind: ${data.current.windspeed}
☁️ Condition: ${data.current.skytext}
📅 Date: ${data.current.date}`;

      await sock.sendMessage(msg.key.remoteJid, { text: weatherInfo });
    });
  },

  // QR Code Generator
  async qr(sock, msg, args) {
    const text = args.join(' ');
    if (!text) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Please provide text for QR code\nExample: .qr Hello World' 
      });
      return;
    }

    try {
      const qrBuffer = await qrcode.toBuffer(text);
      await sock.sendMessage(msg.key.remoteJid, { 
        image: qrBuffer,
        caption: '✅ QR Code generated successfully!'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to generate QR code' 
      });
    }
  },

  // Password Generator
  async password(sock, msg, args) {
    const length = parseInt(args[0]) || 12;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    await sock.sendMessage(msg.key.remoteJid, { 
      text: `🔐 *Generated Password (${length} chars):*\n\`\`\`${password}\`\`\`\n\n⚠️ Save it securely!` 
    });
  },

  // UUID Generator
  async uuid(sock, msg, args) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    await sock.sendMessage(msg.key.remoteJid, { 
      text: `🆔 *Generated UUID:*\n\`${uuid}\`` 
    });
  },

  // Generic tool
  async generic(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🛠️ Tool feature coming soon!' 
    });
  }
};
