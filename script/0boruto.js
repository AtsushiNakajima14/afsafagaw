const axios = require("axios");

module.exports.config = {
    name: "boruto",
    version: "1.0.0",
    credits: "Developer",
    description: "Chat with Boruto (C.AI)",
    hasPrefix: true,
    cooldown: 5,
    aliases: ["bor"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("Please provide a query.", event.threadID, event.messageID);
        }

        api.sendMessage("Processing your query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://joshweb.click/pai/boruto?q=${encodeURIComponent(q)}&uid=100`);
                const answer = response.data.result;

                api.sendMessage(answer, event.threadID);
            } catch (error) {
                console.error(error);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (error) {
        console.error("Error in ai command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
