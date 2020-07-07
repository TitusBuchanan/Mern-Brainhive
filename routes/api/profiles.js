// create the post (register profile) route. for now make it a public url and expect userid in the body.
const express = require("express");
const config = require("../../config");
const router = express.Router();
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");

router.get("/", auth, (req, res) => {
  console.log(req.user);
  res.send("Profile Route");
});

//@route  POST api/profile
//@desc   Create or update user profile
//@access Private
router.post(
  "/",
  auth,
  [
    check("firstName", "first name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("educationLevel", "Education level is required").not().isEmpty(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        firstName,
        lastName,
        occupation,
        educationLevel,
        certifications,
        location,
        social,
        summary,
      } = req.body;

      const userId = req.user.id;

      const profileFields = {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        educationLevel,
      };
      profileFields.user = userId;
      if (occupation) profileFields.occupation = occupation;
      if (certifications) profileFields.certifications = certifications;
      if (location) profileFields.location = location;
      if (summary) profileFields.summary = summary;

      profileFields.social = {};
      if (social.githubUrl) profileFields.social.githubUrl = social.githubUrl;
      if (social.twitterUrl)
        profileFields.social.twitterUrl = social.twitterUrl;
      if (social.youtubeUrl)
        profileFields.social.youtubeUrl = social.youtubeUrl;

      const profile = await Profile.create(profileFields);
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// get /self return logged in users profile data. authenticated route
// @route       GET api/profile
// @description Get all profiles 
// @acsess      Public

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','lastname']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});
// get / return all profiles - hacker challenge one -> exclude logged in user from results. Hint: query hacker challenge 2 -> exclued location data. Hint: Projections
// @route       GET api/profile/user/:user_id
// @description Get Profile By User ID
// @acsess      Public

router.get('/user/:user_id', async (req,res) => {
    try {
        const profile = await Profile.findOneByID({ user:req.params.user_id }).populate('user',['name','lastname']);
        if(!profile) return res.status(400).json({ msg: "Profile Not found" });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: "Profile Not found" });
        }
        res.status(500).send('Server Error')
    }

});



module.exports = router;