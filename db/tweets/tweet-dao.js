const model = require('./tweet-model');

const findAllTweets = () => model.find();
const createTweet = (tweet) => model.create(tweet);
const deleteTweet = (id) => model.deleteOne({_id: id});
const updateTweet = (id, tweet) => {

  let liked = tweet.liked;
  let likes = tweet.stats.liked;
  if (liked === true) {
    liked = false;
    likes--;
  } else {
    liked = true;
    likes++;
  }
  model.updateOne({_id: id}, {$set: {liked: liked, "stats.likes": likes}})
};


module.exports = {
  findAllTweets, createTweet,
  deleteTweet, updateTweet
};
