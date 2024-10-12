const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');

// Your Twitter API credentials
const client = new TwitterApi({
  appKey: 'YOUR_API_KEY',
  appSecret: 'YOUR_API_KEY_SECRET',
  accessToken: 'YOUR_ACCESS_TOKEN',
  accessSecret: 'YOUR_ACCESS_TOKEN_SECRET',
});

const rwClient = client.readWrite;

// Function to tweet keywords
async function tweetKeyword() {
  const keywords = ['#JavaScript', '#NodeJS', '#ReactNative', '#WebDevelopment'];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

  try {
    await rwClient.v2.tweet(randomKeyword);
    console.log(`Tweeted: ${randomKeyword}`);
  } catch (error) {
    console.error('Error tweeting:', error);
  }
}

// Schedule a tweet every 30 minutes (adjust as needed)
cron.schedule('*/30 * * * *', tweetKeyword);
