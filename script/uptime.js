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

module.exports.config = async function ({ text, reply }) {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    const id = text[0] || "4";

    const res = (await axios.get(global.deku.ENDPOINT + `/canvas/uptime?id=${id}&instag=cyyydev&ghub=Unknown&fb=Cyy%20Dev&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=SemBlance%20AutoBot`, {
        responseType: "stream"
    })).data;
    
    return reply({body: "⌛:" + hours + ":" + minutes + ":" + seconds + "\nCharacter ID: " + id, attachment: res});
};
