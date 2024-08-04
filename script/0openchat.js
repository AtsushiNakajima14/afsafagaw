const axios = require("axios");

module.exports.config = {
    name: "chat",
    version: "1.0.0",
    credits: "Developer",
    description: "Bisan unsa kay wako kabalo",
    hasPrefix: true,
    cooldown: 3,
    aliases: ["openchat", "oc"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("Please provide a question..", event.threadID, event.messageID);
        }

        api.sendMessage("Processing query...", event.threadID, async (err, info) => {
            if (err) {
                console.error("Error sending initial message:", err);
                return api.sendMessage("An error occurred while processing your request.", event.threadID);
            }

            try {
                const response = await axios.get(`https://ggwp-yyxy.onrender.com/ai/openchat-3.5?q=${encodeURIComponent(q)}&uid=100`);
                const answer = response.data.result;

                
                const finalMessage = `${answer}\n\nMaytag ma brayt kas gipa answer nimo`;
                api.sendMessage(finalMessage, event.threadID);
            } catch (error) {
                console.error("Error fetching AI response or user info:", error);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (error) {
        console.error("Error in ai command:", error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
