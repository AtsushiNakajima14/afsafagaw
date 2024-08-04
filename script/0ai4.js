const axios = require("axios");

module.exports.config = {
    name: "ai4",
    version: "1.0.0",
    credits: "Developer",
    description: "Get answers from Starling",
    hasPrefix: true,
    cooldown: 5,
    aliases: ['starling', 'star']
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("How to use:\n\n• ai4 [query]\n\n• ai4 what are atoms?", event.threadID, event.messageID);
        }

        api.sendMessage("Processing query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://ggwp-yyxy.onrender.com/ai/starling-lm-7b?q=${encodeURIComponent(q)}&uid=100`);
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
