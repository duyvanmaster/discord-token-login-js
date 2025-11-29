const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    // Clean token
    const cleanToken = token.replace(/^"|"$/g, '').trim();

    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--window-size=400,800']
        });

        const pages = await browser.pages();
        const page = pages[0];
        const device = puppeteer.KnownDevices['iPhone 12 Pro'];
        await page.emulate(device);

        console.log("Navigating to Discord login...");
        await page.goto('https://discord.com/login', { waitUntil: 'networkidle2' });

        console.log("Injecting login script...");
        await page.evaluate((userToken) => {
            function login(token) {
                setInterval(() => {
                    document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage.token = `"${token}"`;
                }, 50);
                setTimeout(() => {
                    location.reload();
                }, 2500);
            }
            login(userToken);
        }, cleanToken);

        res.json({ success: true, message: 'Browser launched and login script injected.' });

        // Wait for the page to reload after login, then switch to desktop mode
        console.log("Waiting for login to complete...");
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
            console.log("Navigation timeout, proceeding anyway...");
        });

        console.log("Switching to desktop mode...");
        // Clear mobile emulation by setting desktop viewport
        await page.setViewport({
            width: 1280,
            height: 720,
            isMobile: false,
            hasTouch: false
        });

        // Set desktop user agent
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Resize the actual browser window to desktop size
        const session = await page.target().createCDPSession();
        const { windowId } = await session.send('Browser.getWindowForTarget');
        await session.send('Browser.setWindowBounds', {
            windowId,
            bounds: { width: 1280, height: 800 }
        });

        console.log("Desktop mode activated. Browser remains open.");

        // Browser remains open as per original requirement

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Failed to launch browser or inject script.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
