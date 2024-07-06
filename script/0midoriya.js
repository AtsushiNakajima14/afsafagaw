const axios = require("axios");

module.exports.config = {
    name: "midoriya",
    version: "1.0.0",
    credits: "CyDev",
    description: "Chat with Midoriya (C.AI)",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["deku", "izuki"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("How to use:\n\n• deku/midoriya [query]\n\n• deku/midoriya who are you?", event.threadID, event.messageID);
        }

        api.sendMessage("Processing your query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://joshweb.click/pai/deku?q=${encodeURIComponent(q)}&uid=100`);
                const answer = response.data.result;

                api.sendMessage(answer, event.threadID);
            } catch (error) {
                console.error(error);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (error) {
        console.error("Error in lma command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
