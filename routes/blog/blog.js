const auth = require('../../middleware/auth')
const router = require('express').Router();
const Blog = require('../../models/blog')
// const multer = require('multer');
// const path = require('path')
const User = require('../../models/User')
const upload = require('../../middleware/upload')


//ROUTE POST
//ADD POST
router.post('/create', auth, upload.single('image') , async (req, res) => {
    const { title, info } = req.body;
    console.log(req.file)
    try {
        let blog = await Blog.findOne({ title });
        if (blog) {
            return res.status(400).json({ msg: "Post already with title" })
        }

        blog = new Blog({
            title,
            info,
            user: req.user.id,
            image: req.file.location
        });

        User.findOneAndUpdate({ _id: req.user.id },
            { $push: { blogs: blog._id } }, (err, success) => {
                if (err) console.log(err.message);
                success.save();
            })



        await blog.save();
        res.status(200).json(blog)


    } catch (err) {
        console.log(err);
        return res.status(500).send('server error')
    }
})

// router.post('/image', upload.single('image'), (req, res) => {
//     console.log(req.file)
//     const file = req.file
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })

//ROUTE DELETE
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Blog.findOne({ _id: req.params.id })
        await post.remove();
        res.status(200).json({ msg: "Post Delete SuccessFully." })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Could not delete post" })
    }
})

//UPDATE ROUTE
router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Blog.findOneAndUpdate({ _id: req.params.id },
            { $set: { info: req.body.info, title: req.body.title } }, { upsert: true });

        await post.save();
        res.status(200).json(post)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error')
    }
})

//GET Single POST BY USER
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id).populate('user', '-password -date -blogs')

        if (!post) {
            return res.json({ msg: 'No Post found' });
        }

        res.json(post);
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.json({ msg: 'No Post found' });
        }
        res.status(500).send('internal server error');
    }
})

//GET ALL POSTS
router.get('/posts/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('blogs');
        res.json(user.blogs)
    } catch (err) {
        console.log(err.message)
    }
});




module.exports = router