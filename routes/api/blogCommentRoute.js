const router = require('express').Router();
const {BlogComment, User} = require('../../models/')


router.post('/', async (req, res) => {
    try {
        const { user_id, body, postId } = req.body;

        const postData = await BlogComment.create({
            user_id,
            body,
            postId
        });

        console.log(postData);
        return res.json(postData);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});



router.get('/', async (req,res)=> {
    try {
       const commentData = await BlogComment.findAll({
        inlude: [User]
       }) ;
       return res.status(200).json(commentData)
    } catch (hands) {
        console.error(hands)
        res.status(500).json(hands)
        
    }
})


module.exports = router