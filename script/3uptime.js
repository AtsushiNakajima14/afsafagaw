const axios = require("axios");

module.exports.config = {
    name: "uptime",
    version: "1.0.2",
    role: 0,
    credits: "Deku & Cy",
    description: "uptime",
    hasPrefix: false,
    cooldowns: 5,
    aliases: ["upt", "up"]
};

module.exports['run'] = async function ({ args, api, event }) {
function reply(m) {
api.sendMessage(m, event.threadID, event.messageID)
}
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    const id = Math.floor(Math.random() * 800) + 1;
    const bot = "SemBlance Bot";
    const insta = "cyyydev";
    const gh = "Unknown";
    const fb = "Cyy Dev";
    const res = (await axios.get('https://deku-rest-api.gleeze.com' + `/canvas/uptime?id=${id}&instag=${insta}&ghub=${gh}&fb=${fb}&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=${bot}`, {
        responseType: "stream"
    })).data;
    return reply({body: "⌛:" + hours + ":" + minutes + ":" + seconds + "\nCharacter ID: " + id, attachment: res});
};
