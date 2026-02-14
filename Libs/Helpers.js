const fs = require('fs');
const path = require('path');

class Helpers {
  // Format time
  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v < 10 ? "0" + v : v).join(":");
  }

  // Format file size
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Generate random string
  randomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Save file temporarily
  async saveTempFile(buffer, extension = 'mp4') {
    const filename = `temp_${Date.now()}_${this.randomString(5)}.${extension}`;
    const filepath = path.join(__dirname, '../temp', filename);
    
    if (!fs.existsSync(path.join(__dirname, '../temp'))) {
      fs.mkdirSync(path.join(__dirname, '../temp'));
    }
    
    fs.writeFileSync(filepath, buffer);
    return filepath;
  }

  // Clean temp files
  cleanTempFiles(hours = 1) {
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) return;
    
    const files = fs.readdirSync(tempDir);
    const now = Date.now();
    
    files.forEach(file => {
      const filepath = path.join(tempDir, file);
      const stats = fs.statSync(filepath);
      const age = (now - stats.mtimeMs) / (1000 * 60 * 60);
      
      if (age > hours) {
        fs.unlinkSync(filepath);
      }
    });
  }
}

module.exports = new Helpers();
