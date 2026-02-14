module.exports = {
  // Random Joke
  async joke(sock, msg, args) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "What do you call a fake noodle? An impasta!",
      "Why did the scarecrow win an award? He was outstanding in his field!",
      "Why don't eggs tell jokes? They'd crack each other up!",
      "What do you call a bear with no teeth? A gummy bear!"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `😂 *Joke:* ${randomJoke}` });
  },

  // Random Meme
  async meme(sock, msg, args) {
    const memes = [
      "https://i.imgflip.com/1bij.jpg",
      "https://i.imgflip.com/1bji.jpg",
      "https://i.imgflip.com/26am.jpg"
    ];
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    await sock.sendMessage(msg.key.remoteJid, { 
      image: { url: randomMeme },
      caption: "😂 Here's your meme!"
    });
  },

  // Random Fact
  async fact(sock, msg, args) {
    const facts = [
      "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs!",
      "A day on Venus is longer than a year on Venus!",
      "Octopuses have three hearts!",
      "Bananas are berries, but strawberries aren't!",
      "There are more stars in space than grains of sand on Earth!"
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `📚 *Fact:* ${randomFact}` });
  },

  // Inspirational Quote
  async quote(sock, msg, args) {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Life is what happens when you're busy making other plans. - John Lennon",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "It does not matter how slowly you go as long as you do not stop. - Confucius",
      "Everything you've ever wanted is on the other side of fear. - George Addair"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `💫 *Quote:* ${randomQuote}` });
  },

  // Roast someone
  async roast(sock, msg, args) {
    const roasts = [
      "You're not stupid; you just have bad luck thinking.",
      "I'd agree with you, but then we'd both be wrong.",
      "You bring everyone so much joy when you leave the room.",
      "I've seen salads more intimidating than you.",
      "You're the reason they put instructions on shampoo bottles."
    ];
    const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 'someone';
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `@${target.split('@')[0]} ${randomRoast}`,
      mentions: [target]
    });
  },

  // Compliment someone
  async compliment(sock, msg, args) {
    const compliments = [
      "You have a great sense of humor!",
      "Your smile is contagious!",
      "You're better than a triple-scoop ice cream cone!",
      "You're one of the brightest people I know!",
      "You're a gift to those around you!"
    ];
    const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 'someone';
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `@${target.split('@')[0]} ${randomCompliment}`,
      mentions: [target]
    });
  },

  // Riddle
  async riddle(sock, msg, args) {
    const riddles = [
      { question: "What has keys but can't open locks?", answer: "A piano" },
      { question: "What has a head, a tail, but no body?", answer: "A coin" },
      { question: "What gets wetter as it dries?", answer: "A towel" }
    ];
    const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `🤔 *Riddle:* ${randomRiddle.question}\n\nType .answer to see answer` 
    });
  },

  // Truth or Dare - Truth
  async truth(sock, msg, args) {
    const truths = [
      "What's your biggest fear?",
      "Have you ever cheated on a test?",
      "What's the most embarrassing thing you've done?",
      "Who was your first crush?",
      "What's a secret you've never told anyone?"
    ];
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🎯 *Truth:* ${randomTruth}` });
  },

  // Truth or Dare - Dare
  async dare(sock, msg, args) {
    const dares = [
      "Do 20 pushups right now!",
      "Send a message to your ex",
      "Sing a song in the chat",
      "Post your last photo in the chat",
      "Talk in rhymes for the next 5 minutes"
    ];
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `⚡ *Dare:* ${randomDare}` });
  },

  // Would You Rather
  async wyr(sock, msg, args) {
    const wyrQuestions = [
      "Would you rather be able to fly or be invisible?",
      "Would you rather be rich but unhappy or poor but happy?",
      "Would you rather lose all your money or lose all your memories?",
      "Would you rather live on the beach or in the mountains?",
      "Would you rather be 10 minutes early or 10 minutes late?"
    ];
    const randomWYR = wyrQuestions[Math.floor(Math.random() * wyrQuestions.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🤔 *Would You Rather:* ${randomWYR}` });
  },

  // Never Have I Ever
  async nhie(sock, msg, args) {
    const nhieQuestions = [
      "Never have I ever lied to my best friend",
      "Never have I ever stalked someone on social media",
      "Never have I ever skipped school",
      "Never have I ever broken someone's heart",
      "Never have I ever sang in the shower"
    ];
    const randomNHIE = nhieQuestions[Math.floor(Math.random() * nhieQuestions.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🎮 *Never Have I Ever:* ${randomNHIE}` });
  },

  // Generic fun command
  async generic(sock, msg, args) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🎮 Fun feature coming soon!' 
    });
  }
};
