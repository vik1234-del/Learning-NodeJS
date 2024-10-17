const dotenv = require("dotenv");
const { TwitterApi } = require("twitter-api-v2");
const cron = require("node-cron");

dotenv.config();

// Initialize the Twitter client with OAuth 1.0a?
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Tweet variations
const tweetMessages = require("./tweetMessages.json");

let availableTweets = [...tweetMessages];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateTweet() {
  if (availableTweets.length === 0) {
    console.log(
      "All tweets have been used. Resetting and shuffling the tweet pool."
    );
    availableTweets = [...tweetMessages];
    shuffleArray(availableTweets);
  }
  return availableTweets.pop();
}

async function tweetMessage() {
  try {
    const tweetContent = generateTweet();
    await twitterClient.v2.tweet(tweetContent);
    console.log(`Tweeted: ${tweetContent}`);
    console.log(`Remaining unique tweets: ${availableTweets.length}`);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log("Rate limit exceeded. Pausing tweet scheduling...");
      await new Promise((resolve) => setTimeout(resolve, 30000)); // Retry after 30 sec
      await tweetMessage(); // Retry tweet operation
    } else {
      console.error("Error tweeting:", error);
    }
  }
}

// Initial shuffle
shuffleArray(availableTweets);

// Initial tweet
tweetMessage();

//Schedule the cron job to tweet every 20 min
cron.schedule("*/10 * * * *", () => {
  console.log("Running scheduled tweet...");
  tweetMessage();
});
