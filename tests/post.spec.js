const Post = require('../models/post')

describe('Post model', () => {

    it('all returns an array', () => {
        const result = Post.all;
        expect(typeof(result)).toEqual("object");
    })

    it('findByID returns an object with a valid ID input', () => {
        const result = Post.findByID(1);
        expect(typeof(result)).toEqual("object");
    })

    it('findByID returns an error with an invalid ID input', () => {
        expect(() => {
            Post.findByID(100000)
        }).toThrow();
    })

    it('searchPosts returns an empty array', () => {
        const result = Post.searchPosts("lmnopqrst");
        expect(result.length).toBe(0);
    })

    it('searchPosts returns an array with posts conataining "aldi', () => {
        const result = Post.searchPosts("aldi");
        expect(result.length).toBeGreaterThan(0);
    })
    
    it('sorts posts in ascending ID order when called with comparison = 0', () => {
        const sortedPosts = Post.sortPosts(Post.all, 0);
        let post1 = sortedPosts[0].id
        let post2 = sortedPosts[1].id
        expect(post1).toBeLessThan(post2);
    })

    it('sorts posts in descending ID order when called with comparison = 1', () => {
        const sortedPosts = Post.sortPosts(Post.all, 1);
        expect(sortedPosts[0].id).toBeGreaterThan(sortedPosts[1].id);
    })

    it('sorts posts in ascending order of reactions and comments when called with comparison = 2', () => {
        const sortedPosts = Post.sortPosts(Post.all, 2);
        expect(sortedPosts[0].comments.length + Object.values(sortedPosts[0].reactions).reduce((a, b) => a + b, 0)).toBeGreaterThanOrEqual(sortedPosts[1].comments.length + Object.values(sortedPosts[1].reactions).reduce((a, b) => a + b, 0));
    })

    it('addEmoji with postID returns an object', () => {
        const result = Post.addEmoji(1,"heart");
        expect(typeof(result)).toEqual("object");
    })

    it('deletePost returns an error with an invalid ID input', () => {
        expect(() => {
            Post.deletePost(100000)
        }).toThrow();
    })

})