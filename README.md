# Discord Mobile Login Tool

A professional Node.js tool to automate Discord login using tokens. Features both a sleek web interface and CLI mode, with automatic mobile-to-desktop switching for the best user experience.

## ✨ Features

- 🌐 **Modern Web Interface** - Beautiful, Discord-themed UI for easy token login
- 💻 **CLI Support** - Traditional command-line interface option
- 📱 **Mobile Emulation** - Uses iPhone 12 Pro emulation for mobile-only login methods
- 🖥️ **Auto Desktop Switch** - Automatically resizes to desktop mode after login
- 🎨 **Professional Design** - Clean, modern interface with Discord's signature blurple colors

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/duyvanmaster/discord-token-login-js.git
   cd discord-token-login-js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 💡 Usage

### Web Interface (Recommended)

1. Start the web server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Paste your Discord token and click **Login**

4. A browser window will open, automatically:
   - Emulate mobile device
   - Inject your token
   - Login to Discord
   - Switch to desktop mode
   - Resize to full desktop window

### CLI Mode

If you prefer the command-line interface:

```bash
npm run cli
```

Then paste your token when prompted.

## 🛠️ How It Works

1. **Mobile Emulation**: Opens Chrome with iPhone 12 Pro emulation (required for certain login methods)
2. **Token Injection**: Injects your token into Discord's localStorage using an iframe technique
3. **Auto Login**: Page reloads and Discord authenticates with the token
4. **Desktop Switch**: Automatically switches to desktop viewport and resizes the window
5. **Ready to Use**: Browser stays open for you to use Discord normally

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the web server (production) |
| `npm run dev` | Start the web server with auto-reload (development) |
| `npm run cli` | Run the CLI version |

## ⚠️ Security Warning

- **Never share your Discord token with anyone**
- Only use tokens you own and trust
- This tool is for educational purposes
- Use at your own risk

## 🔧 Tech Stack

- **Express** - Web server
- **Puppeteer** - Browser automation
- **HTML/CSS/JS** - Frontend interface

## 📝 License

MIT

## 👤 Author

[duyvanmaster](https://github.com/duyvanmaster)

---

**Note**: This tool uses Puppeteer to control a Chrome instance for automation purposes.
