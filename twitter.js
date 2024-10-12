require('dotenv').config(); 
const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');

// Initialize the Twitter client with OAuth 1.0a credentials
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Tweet variations
const tweetMessages = [
  "Get ready for a boost! This tweet will give you 60000 $ZAAR from @ordzaar points🪂🚀",
  "Don't miss out! $ZAAR FARMING ends on 14th. Keep farming! 🔥",
  "Join the $ZAAR community and let’s achieve more XP together! 🚀",
  "Remember to FOLLOW @luxe_strides for updates! 🧑🏽‍🌾",
  "LIKE this tweet for 100 $ZAAR! 🧑🏽‍🌾",
  "Retweet to earn 1000 $ZAAR! Let’s grow together! 💰",
  "Boost your earnings! Tweet with $ZAAR to get noticed! 🌟",
  "Exciting times ahead! Keep tweeting with $ZAAR! 📈",
  "Have you checked out our $ZAAR features? Don’t miss out! 🚀",
  "Farming with $ZAAR is the way to go! Join us now! 🌾",
  "Spread the word! Share your thoughts using $ZAAR! 🗣️",
  "Let’s create a buzz around $ZAAR! Tweet now! 🎉",
  "The future is bright with $ZAAR! Join us! 🌟",
  "Your next adventure awaits! Use $ZAAR and thrive! 🌍",
  "Let’s build a better community with $ZAAR! 💪",
  "Unlock your potential with $ZAAR today! 🔑",
  "What are you waiting for? Dive into $ZAAR! 💧",
  "Join the $ZAAR movement! Together, we are unstoppable! 🚀",
  "Experience the benefits of $ZAAR farming! 🌱",
  "Every tweet counts! Add $ZAAR to your message! 📝",
  "Let’s achieve greatness with $ZAAR! 🚀",
  "Your opinion matters! Share it with $ZAAR! 💭",
  "Help us grow! Tweet with $ZAAR! 🌳",
  "Together we rise! Use $ZAAR and uplift the community! 📈",
  "Celebrate your journey with $ZAAR! 🎉",
  "Join us in making $ZAAR a household name! 🌟",
  "Let’s push the boundaries with $ZAAR! 🏆",
  "We’re all about innovation with $ZAAR! 🔍",
  "Keep your eyes on the prize! $ZAAR is the way! 🎯",
  "Get involved! Tweet using $ZAAR! 🗣️",
  "Unite for success with $ZAAR! 🤝",
  "Let’s make waves in the crypto world with $ZAAR! 🌊",
  "Get creative! Share your $ZAAR story! 🎨",
  "Your voice is powerful! Use $ZAAR to amplify it! 📣",
  "Every dollar counts! Make yours with $ZAAR! 💵",
  "Be part of the change with $ZAAR! 🌈",
  "Let’s revolutionize farming together with $ZAAR! 🔄",
  "Don’t just watch, participate! Use $ZAAR! 👀",
  "Join the journey to success with $ZAAR! 🚀",
  "Your contribution matters! Share it with $ZAAR! 📝",
  "Together, we can achieve more with $ZAAR! 🌟",
  "Keep pushing forward with $ZAAR! 🏃‍♂️",
  "Let’s create a brighter future with $ZAAR! 🔆",
  "Your support is crucial! Use $ZAAR! 🤗",
  "Let’s build a legacy with $ZAAR! 🏛️",
  "Make every tweet count with $ZAAR! 🖊️",
  "Join the $ZAAR family! We’re better together! 🏠",
  "Embrace the power of community with $ZAAR! 🌍",
  "Tweet your thoughts with $ZAAR and get involved! 💬",
  "Elevate your game with $ZAAR! 🎮",
  "Let’s turn dreams into reality with $ZAAR! 💫",
  "Be bold, be brave! Tweet with $ZAAR! 🦸‍♂️",
  "The sky's the limit with $ZAAR! 🌌",
  "Inspiration is everywhere! Use $ZAAR to share yours! ✨",
  "Challenge yourself! Tweet using $ZAAR! 💪",
  "Let’s reach new heights together with $ZAAR! 🏔️",
  "Your journey begins with $ZAAR! 🌍",
  "Spread the love for $ZAAR! ❤️",
  "Empower others with your $ZAAR message! 💪",
  "Let's make an impact with $ZAAR! 🌊",
  "Every tweet is a step towards success with $ZAAR! 🚶‍♀️",
  "Join us in the $ZAAR revolution! ✊",
  "Stay tuned for more updates on $ZAAR! 📡",
  "Let’s celebrate achievements with $ZAAR! 🥳",
  "Your potential is limitless with $ZAAR! 🌠",
  "Shout out your $ZAAR achievements! 📢",
  "In it together! Let’s thrive with $ZAAR! 🤝",
  "Make your mark! Use $ZAAR! ✍️",
  "Let’s inspire others with our $ZAAR journey! 🌈",
  "Step into the future with $ZAAR! ⏳",
  "Keep the momentum going with $ZAAR! ⚡",
  "Let’s show the world what $ZAAR can do! 🌍",
  "Get involved and tweet with $ZAAR! ✨",
  "Your creativity shines with $ZAAR! 🌟",
  "Keep growing and sharing with $ZAAR! 🌿",
  "Let’s connect through $ZAAR! 🔗",
  "Your voice is needed! Tweet with $ZAAR! 🗣️",
  "Together, we’ll make a difference with $ZAAR! 🌟",
  "Be a trailblazer! Use $ZAAR in your tweets! 🌲",
  "Let’s unlock new opportunities with $ZAAR! 🔓",
  "Your journey matters! Share it with $ZAAR! 🚀",
  "Join the movement! Tweet with $ZAAR! 🌊",
  "The adventure begins with $ZAAR! 🎉",
  "Share your $ZAAR dreams! 🌌",
  "Let’s innovate together with $ZAAR! 💡",
  "Make waves in the community with $ZAAR! 🌊",
  "Keep the spirit alive! Use $ZAAR! 🔥",
  "Your message can inspire! Tweet with $ZAAR! 💖",
  "Let’s change the game with $ZAAR! 🕹️",
  "Be part of the solution with $ZAAR! 🧩",
  "Together, we’ll achieve greatness with $ZAAR! 🏆",
  "Join the conversation with $ZAAR! 💬",
  "Let’s make a lasting impact with $ZAAR! 🌍",
  "Your support is key! Tweet with $ZAAR! 🔑",
  "Inspire others with your journey! Use $ZAAR! 🌠",
  "Let's amplify our voices with $ZAAR! 📢",
  "The future is bright with $ZAAR! 🌞",
  "Make a statement! Use $ZAAR! ✨",
  "Together, we rise with $ZAAR! 🌅",
  "Let’s build a brighter tomorrow with $ZAAR! 🌅",
  "Your story matters! Share it with $ZAAR! 📖",
  "Join us for an amazing journey with $ZAAR! 🚀",
  "Embrace the possibilities with $ZAAR! 🔮",
  "Keep sharing your $ZAAR journey! 📷",
  "The community thrives on your support! Use $ZAAR! 🌳",
  "Together we can unlock the full potential of $ZAAR! 🚀",
  "Every interaction with $ZAAR is a step toward community growth! 🤝",
  "Let your voice resonate through $ZAAR! 🗣️",
  "Experience the thrill of growth with $ZAAR! 🌱",
  "Let’s inspire positivity with every $ZAAR tweet! 🌈",
  "Your contributions to $ZAAR matter! Share them! 🌟",
  "Engage and elevate with $ZAAR! 🌄",
  "Unlock rewards by engaging with $ZAAR! 🔓",
  "Let’s collaborate for a brighter future with $ZAAR! 🤝",
  "Spread positivity and opportunities through $ZAAR! 🌍",
  "Create connections and opportunities with $ZAAR! 🔗",
  "Your thoughts matter! Share them with $ZAAR! 💭",
  "Let’s create a wave of excitement with $ZAAR! 🌊",
  "Elevate your presence in the community with $ZAAR! 🌟",
  "Every $ZAAR tweet brings us closer to our goals! 🎯",
  "Share your insights with $ZAAR! 💡",
  "Let’s push boundaries together with $ZAAR! 🚀",
  "Join us in making $ZAAR a success story! 📖",
  "Your input can shape the future of $ZAAR! 🛤️",
  "Together, we can achieve more with $ZAAR! 🤝",
  "Share your ideas and grow with $ZAAR! 🌱",
  "Let’s inspire innovation through $ZAAR! 💡",
  "Celebrate your milestones with $ZAAR! 🎉",
  "The future is bright with our collective efforts in $ZAAR! 🌞",
  "Join us in making waves in the community with $ZAAR! 🌊",
  "Let’s turn dreams into reality with our passion for $ZAAR! ✨",
  "Together, we can unlock new opportunities with $ZAAR! 🔓",
  "Let’s thrive and support each other in the $ZAAR journey! 🌈",
  "Your journey is valuable! Share it with $ZAAR! 📖",
  "Get ready to explore new horizons with $ZAAR! 🚀",
  "Make your mark in the community with $ZAAR! ✍️",
  "Embrace the possibilities that come with $ZAAR! 💫",
  "Together, let’s create a lasting legacy with $ZAAR! 🏛️",
  "Your thoughts and ideas can spark change with $ZAAR! 🔥",
  "Join the movement to elevate $ZAAR! 📈",
  "Share your insights and engage with $ZAAR! 💬",
  "Let’s inspire each other to achieve greatness with $ZAAR! 🌟",
  "Celebrate every achievement with the $ZAAR community! 🎊",
  "Keep sharing your journey with $ZAAR! 🌿",
  "Together, we can achieve incredible things with $ZAAR! 🏆",
  "Let’s turn our dreams into reality with $ZAAR! 🌅",
  "Your voice is powerful! Use $ZAAR to amplify it! 📣",
  "Together, we can revolutionize the industry with $ZAAR! 🔄",
  "Get involved and make a difference with $ZAAR! 🌍",
  "Keep the spirit of community alive with $ZAAR! ❤️",
  "Every tweet with $ZAAR is a step towards progress! 🚶‍♂️",
  "Join us in the quest for greatness with $ZAAR! 🚀",
  "Share your $ZAAR story and inspire others! 📖",
  "Let’s create a better tomorrow with our efforts in $ZAAR! 🌈",
  "Your participation matters! Join us with $ZAAR! 🤝",
  "Embrace your journey with $ZAAR! 💖",
  "Let’s build a brighter future with $ZAAR! 🌅",
  "Your ideas can spark inspiration with $ZAAR! 💡",
  "Together, we can achieve our goals with $ZAAR! 🌍",
  "Join the adventure and grow with $ZAAR! 🎉",
  "Every moment counts! Make yours with $ZAAR! ⏳",
  "Let’s create magic together with $ZAAR! ✨",
  "In it for the long haul! Keep tweeting with $ZAAR! ⏰",
];


let availableTweets = [...tweetMessages];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateTweet() {
  if (availableTweets.length === 0) {
    console.log('All tweets have been used. Resetting and shuffling the tweet pool.');
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
    console.error('Error tweeting:', error);
  }
}

// Initial shuffle
shuffleArray(availableTweets);

// Initial tweet
tweetMessage();

// Schedule the cron job to tweet every 10 min
cron.schedule('*/10 * * * *', () => {
  console.log('Running scheduled tweet...');
  tweetMessage();
});