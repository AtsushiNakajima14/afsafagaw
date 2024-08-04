const axios = require("axios");

module.exports.config = {
    name: "ai5",
    version: "1.0.0",
    credits: "CyDev",
    description: "Get responses on Microsoft Phi!",
    hasPrefix: true,
    cooldown: 5,
    aliases: ["p", "microsoft", "phi"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("How to use:\n\n• phi/p [query]\n\n• phi/p who are you?", event.threadID, event.messageID);
        }

        api.sendMessage("Processing your query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://ggwp-yyxy.onrender.com/ai/phi-2?q=${encodeURIComponent(q)}&uid=100`);
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
