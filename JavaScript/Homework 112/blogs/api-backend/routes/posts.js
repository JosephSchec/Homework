const express = require('express');
const router = express.Router();
const authenticatedOnly = require('../authenticatedOnly');
const Mongo = require('mongodb');

router.route('/:skip/:limit')
  .get(async (req, res, next) => {
    let thePosts;

    if (!req.params.skip || !req.params.limit) {
      thePosts = await global.posts.find().toArray();
    }
    else {
      thePosts = await global.posts.find().skip(+req.params.skip).limit(+req.params.limit).toArray()
    }
    res.send(thePosts);
  })
  .post(authenticatedOnly, async (req, res, next) => {
    const newPost = {
      title: req.body.title,
      body: req.body.body,
      author: req.session.user,
      date: new Date()
    };

    await global.posts.insertOne(newPost);

    res.status(201)
      //.location(`/posts/${newPost._id}`)
      .send(newPost);
  });

router.post('/:id/comments', authenticatedOnly, async (req, res, next) => {
  const newComment = {
    body: req.body.body,
    author: req.session.user,
    date: new Date()
  };

  const result = await global.posts.updateOne({ _id: Mongo.ObjectId(req.params.id) }, { $push: { comments: newComment } });

  if (!result.modifiedCount) {
    return res.status(404).send('Not found');
  }

  socketIo.emit('comment', { postId: req.params.id, comment: newComment });

  res.status(201)
    //.location(`/posts/id/${newComment._id}`)
    .send(newComment);
});

module.exports = router;