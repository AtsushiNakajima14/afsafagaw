const fetch = require('node-fetch');

async function g() {
    try {
        const r = await fetch('https://onlytik.com/api/new-videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ limit: 10 })
        });

        if (!r.ok) {
            throw new Error('Network response was not ok');
        }

        const b = await r.json();

        if (!Array.isArray(b) || b.length === 0) {
            throw new Error('Unexpected response format or empty array');
        }

        const i = Math.floor(Math.random() * b.length);
        const v = b[i];

        return {
            u: v.url,
            l: v.likes
        };

    } catch (e) {
        console.error('Error fetching videos:', e);
        throw e;
    }
}

module.exports.config = {
    name: "tiktok",
    version: "1.0",
    role: 0,
    credits: "Developer",
    description: "get random tiktok videos",
    hasPrefix: false,
    cooldowns: 5,
    aliases: ["tt", "tik"]
};

module.exports.run = async function ({ message }) {
    try {
        const { u, l } = await g();

        const s = await global.utils.getStreamFromURL(u);

        if (!s) {
            return message.reply("Failed to retrieve the video. Please try again.");
        }

        return message.reply({
            body: `Here's a random tiktok video!\n${l} likes:`,
            attachment: s
        });
    } catch (e) {
        console.error("Error fetching or sending the video:", e);
        return message.reply("An error occurred while fetching the video. Please try again later.");
    }
};
