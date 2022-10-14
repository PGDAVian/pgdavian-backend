const Post = require('../models/post');
const request = require("supertest");
const server = require('../app');



describe('API server', () => {
    let api
    let newComment = {
        comment: "Wow yeah I agree"
    };
    let newPost = {
        subject: "Aldi",
        journalInput: "tesco",
        gif: "sdfdsf",
        date: "9809"
    }

    let post2delete = Post.all.length -1; 

    beforeAll(() => {
        api = server.listen(5000, () => console.log('Test server running on port 5000'))
        Post.createPost(newPost) // atleast one post needed in json before with postID = 1 before running tests
    })

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('it responds to get / with status 200', done => {
        request(api)
        .get('/')
        .expect(200, done);
    })

    it('it responds to get /search?search=returnnothingok with status 200', done => {
        request(api)
        .get('/search?search=returnnothingok')
        .expect(200)
        .expect([] ,done);
    })

    it('it responds to get /search?search=asda with status 200', done => {
        let result = JSON.stringify(Post.searchPosts("asda"))
        request(api)
        .get('/search?search=asda')
        .expect(200)
        .expect(result, done);
    })

    it('it responds to get /?sort=0 with status 200', done => {
        request(api)
        .get('/?sort=0')
        .expect(200, done);
    })

    it('it responds to get /?sort=1 with status 200', done => {
        request(api)
        .get('/?sort=1')
        .expect(200, done);
    })

    it('it responds to get /?sort=2 with status 200', done => {
        request(api)
        .get('/?sort=2')
        .expect(200, done);
    })

    it('it responds to post / with status 201', done => {
        request(api)
        .post('/')
        .send(newPost)
        .expect(201, done);
    })

    it('it responds to patch /1 with status 201', done => {
        request(api)
        .patch('/1')
        .send(newComment)
        .expect(201, done);
    })

    it('it responds to patch /1/heart with status 201', done => {
        request(api)
        .patch('/1/heart')
        .expect(201, done);
    })

    it('it responds to delete /2000 with status 200', done => {
        request(api)
        .delete('/2000')
        .expect(500, done);
    })

    it('it responds to delete /9 with status 200', done => {
        let maxId = 0;
        Post.all.forEach( post => {
            if (post.id > maxId)  {
                maxId = post.id
            }
        })
        request(api)
        .delete(`/${maxId}`)
        .expect(200, done);
    })
})