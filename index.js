const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Discord Mobile Token Login Tool");
console.log("-------------------------------");

rl.question('Please enter your Discord token: ', async (token) => {
    // Remove quotes if the user accidentally included them
    token = token.replace(/^"|"$/g, '').trim();

    if (!token) {
        console.error("Error: Token cannot be empty.");
        rl.close();
        return;
    }

    console.log("Launching browser...");

    try {
        const browser = await puppeteer.launch({
            headless: false, // Show the browser
            defaultViewport: null,
            args: ['--window-size=400,800'] // Mobile-ish window size
        });

        const page = await browser.newPage();

        // Emulate a mobile device (iPhone 12 Pro)
        // This is crucial because the user said "chỉ hoạt động ở giao diện mobile"
        const device = puppeteer.KnownDevices['iPhone 12 Pro'];
        await page.emulate(device);

        console.log("Navigating to Discord login...");
        await page.goto('https://discord.com/login', { waitUntil: 'networkidle2' });

        console.log("Injecting login script...");

        // Inject the user's provided code
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
        }, token);

        console.log("Script injected. The page should reload and login shortly.");
        console.log("Keep this terminal open to keep the browser open.");

        // We don't close the browser automatically so the user can use it.
        // browser.close(); 

    } catch (error) {
        console.error("An error occurred:", error);
    }

    rl.close();
});
