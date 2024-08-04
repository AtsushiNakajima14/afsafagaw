const axios = require("axios");

module.exports.config = {
    name: "cid",
    version: "1.0.0",
    credits: "Developer",
    description: "Chat with Kagenuo (C.AI!)",
    hasPrefix: true,
    cooldown: 5,
    aliases: ["kagenou", "shadow"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let q = args.join(" ");
        if (!q) {
            return api.sendMessage("How to use:\n\n• shadow/kagenou [query]\n\n• shadow/kagenou who are you?", event.threadID, event.messageID);
        }

        api.sendMessage("Processing your query...", event.threadID, async (err, info) => {
            try {
                const response = await axios.get(`https://ggwp-yyxy.onrender.com/pai/cid?q=${encodeURIComponent(q)}&uid=100`);
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
