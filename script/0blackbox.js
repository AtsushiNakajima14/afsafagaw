const axios = require('axios');

module.exports.config = {
    name: 'blackbox',
    version: '1.0.0',
    role: 0,
    hasPrefix: true,
    aliases: ['aiv2'],
    description: 'Your helpful assistant!',
    usage: 'aiv2 [Test]',
    credits: 'Developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const bulag = args.join(' ');

    if (!bulag) {
        api.sendMessage('Please provide a question', event.threadID, event.messageID);
        return;
    }

    api.sendMessage('Processing query...', event.threadID, event.messageID);

    try {
        const pangit = await axios.get('https://ggwp-yyxy.onrender.com/blackbox', {
            params: { prompt: bulag }
        });
        const mapanghi = pangit.data;

        const responseString = mapanghi.data ? mapanghi.data : JSON.stringify(mapanghi, null, 2);

        api.sendMessage(responseString, event.threadID, event.messageID);

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
    }
};
