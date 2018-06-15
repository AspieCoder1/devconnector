const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});

		newPost.save().then(post => res.status(200).json(post));
	}
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => {
			if (posts.length < 1) {
				return res.status(404).json({ postsnotfound: 'No posts found' });
			}
			res.status(200).json(posts);
		})
		.catch(e => {
			res.status(500).json({ error: e });
		});
});

// @route   GET api/posts/:id
// @desc    Get posts by id
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (!post) {
				return res
					.status(404)
					.json({ postnotfound: 'No post found with that id' });
			}
			res.status(200).json(post);
		})
		.catch(() => {
			res.status(404);
		});
});

// @route   DELETE api/posts/:id
// @desc    Deletes Post
// @access  Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(() => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.user.toString() !== req.user.id) {
						return res.status(401).json({
							notauthorised: 'You are not authorised to to delete that post'
						});
					}

					post.remove().then(() => res.status(200).json({ success: true }));
				})
				.catch(() => res.status(404).json({ postnotfound: 'Post not found' }));
		});
	}
);

// @route   Post api/posts/like/:id
// @desc    Like a Post
// @access  Private
router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(() => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res
							.status(400)
							.json({ alreadylike: 'You have already liked that post' });
					}
					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.status(200).json(post));
				})
				.catch(() => res.status(404).json({ postnotfound: 'Post not found' }));
		});
	}
);

// @route   Post api/posts/unlike/:id
// @desc    Unlike a Post
// @access  Private
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(() => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length === 0
					) {
						return res
							.status(400)
							.json({ notliked: 'You have not liked this post' });
					}
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					post.likes.splice(removeIndex, 1);
					post.save().then(post => res.status(200).json(post));
				})
				.catch(() => res.status(404).json({ postnotfound: 'Post not found' }));
		});
	}
);

// @route   POST api/posts/comment/:id
// @desc    Adds a comment to the post
// @access  Private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				// Add to comments array
				post.comments.unshift(newComment);

				// Save
				post.save().then(post => res.status(200).json(post));
			})
			.catch(e => res.status(400).json(e));
	}
);

// @route   POST api/posts/comment/:id/:comment_id
// @desc    Removes comment from post
// @access  Private
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentnotexist: 'Comment does not exist' });
				}

				const removeIndex = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);
				post.comments.splice(removeIndex, 1);

				post.save().then(post => res.status(200).json(post));
			})
			.catch(e => res.status(400).json(e));
	}
);

module.exports = router;
