# Discord Token Login Tool

A simple Node.js tool to automate Discord login using tokens with mobile emulation.

## Features

- 🌐 **Web Interface** - Clean UI for easy token login
- 💻 **CLI Mode** - Command-line option available
- 📱 **Mobile Emulation** - Emulates iPhone for mobile-only login methods
- 🖥️ **Auto Desktop Switch** - Automatically switches to desktop mode after login

## Installation

```bash
npm install
```

## Usage

### Web Interface (Recommended)

```bash
npm start
```

Open `http://localhost:3000` and paste your token.

### CLI Mode

```bash
npm run cli
```

## How It Works

1. Opens Chrome with mobile emulation
2. Injects token into Discord
3. Automatically logs in
4. Switches to desktop mode
5. Browser stays open for normal use

## Scripts

- `npm start` - Web server
- `npm run dev` - Web server with auto-reload
- `npm run cli` - CLI mode

## Security Warning

⚠️ **Never share your Discord token** - Use at your own risk.

## Tech Stack

Express • Puppeteer • HTML/CSS/JS

---

Made by [duyvanmaster](https://github.com/duyvanmaster)
