const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('/', (req, res) => {
    if(req.query.sort) {
        res.send(Post.sortPosts(Post.all, req.query.sort))
    }
    res.status(200).send(Post.all);
});

router.get('/search', (req, res) => {
    if(req.query.search) res.status(200).send(Post.searchPosts(req.query.search)); 
});

router.post('/', (req,res) => {
    if(req.body) res.status(201).send(Post.createPost(req.body));   
});

router.patch('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const comment = req.body.comment
    Post.addComment(id, comment)
    res.status(201).send("updated!")
});

router.patch('/:id/:emoji', (req,res) => {
    const id = parseInt(req.params.id)
    const emoji = req.params.emoji
    res.status(201).send(Post.addEmoji(id,emoji))  
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Post.deletePost(id)
    res.status(200).send("deleted")
});

module.exports = router;