module.exports.config = {
  name: 'scrape',
  version: '1.1.1',
  role: 2,
  hasPermssion: 0,
  credits: "Developer",
  description: 'Scraping Web and api/output',
  usePrefix: false,
  hasPrefix: true,
  commandCategory: 'url',
  usage: '{pn} [url]',
  usages: '{pn} [url]',
  cooldown: 0,
  cooldowns: 0,
};

module.exports. run = async function({ api, event, args }) {
  const axios = require('axios');

  let url = args.join(' ');

  try {
    if (!url) {
      return api.sendMessage('Please provide a URL you want to scrape.', event.threadID, event.messageID);
    }

    const cliff = await new Promise(resolve => {
      api.sendMessage('Scraping website, please wait a few seconds...', event.threadID, (err, info1) => {
        resolve(info1);
      }, event.messageID);
    });

    const response = await axios.get(`http://158.101.198.227:8609/scrapper?url=${encodeURIComponent(url)}`);
    const responseData = response.data.results;

    let ughContent = responseData.map(item => item.content).join('\n\n');

    let formattedContent = responseData.map(item => ({
      created_at: item.created_at,
      updated_at: item.updated_at,
      page: item.page,
      url: item.url,
      job_id: item.job_id,
      status_code: item.status_code,
      _request: item._request,
      _response: item._response,
      session_info: item.session_info
    }));

    let sheshh = `${ughContent}\n\n${JSON.stringify(formattedContent, null, 2)}`;

    api.sendMessage(sheshh, event.threadID, event.messageID);    api.unsendMessage(cliff.messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage('Error processing your request; cant access link.', event.threadID, event.messageID);
  }
};
