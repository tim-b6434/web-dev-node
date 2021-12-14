const dao = require('../db/tweets/tweet-dao')

module.exports = (app) => {
  const findAllTweets = (req, res) => {
    dao.findAllTweets()
    .then(tweets => res.json(tweets))
  }

  const postNewTweet = (req, res) => {
    const newTweet = {
      "topic": "Web Development",
      "userName": "ReactJS",
      "verified": false,
      "handle": "ReactJS",
      "time": "2h",
      "avatar-image": "../../../images/react-blue.png",
      "logo-image": "../../../images/react-blue.png",
      "stats": {
        "comments": 123,
        "retweets": 234,
        "likes": 345
      },
      ...req.body
    }
    dao.createTweet(newTweet)
    .then(tweet => res.json(tweet));
  }

  const deleteTweet = (req, res) => {
    const id = req.params['id'];
    dao.deleteTweet(id)
    .then((status) => res.send(status));
  }

  const likeTweet = (req, res) => {
    const id = req.params['id'];
    dao.updateTweet(id, req.body)
    .then((status) => res.send(status))
  }

  app.put('/api/tweets/:id/like', likeTweet);
  app.delete('/api/tweets/:id', deleteTweet);
  app.get('/api/tweets', findAllTweets);
  app.post('/api/tweets', postNewTweet);
};
