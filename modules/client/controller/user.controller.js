const { hashing, compareing } = require('../../../helpers/hashing/hashing');
const advers = require('../../../models/advertising.schema');
const PostSchema = require('../../../models/posts.schema');
const Report = require('../../../models/report.schema');
const UserSchema = require('../../../models/user.schema');
require('dotenv').config();

//! ===|> Update profile <|===
const updateProfile = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.params.id);

    if (user.Block === 'true') {
      res
        .status(401)
        .json({
          message:
            'You are not allowed to update the profile until the block ends',
        });
    }
    const { username, email, password, phone, location, imgUser } = req.body;
    const path = req.file.path;
    if (password !== undefined) {
      var hashPassw = await hashing(password);
    }
    if (phone !== undefined) {
      var hashpho = await hashing(phone);
    }
    const update = {
      ...(username && { username }),
      ...(email && { email }),
      ...(password && { password: hashPassw }),
      ...(phone && { phone: hashpho }),
      ...(location && { location }),
      ...{ imgUser: `${process.env.PATH_IMG_POST + path}` },
    };
    console.log(update);
    const profile = await UserSchema.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.status(200).json({ message: 'Done', profile });
  } catch (error) {
    res.status(400).json({ message: 'error', error });
  }
};

//! ===|> Update password <|===
const updatepassword = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (user.Block === 'true') {
      res
        .status(401)
        .json({
          message:
            'You are not allowed to update the password until the block ends',
        });
    }
    const { oldpassword, newPassword } = req.body;
    const matchPassword = await compareing(oldpassword, user.password);
    if (!matchPassword) {
      res.status(400).json({ message: ' not match oldpassword' });
    }
    const hashPassw = await hashing(newPassword);
    const passwordUpdate = await UserSchema.findByIdAndUpdate(req.params.id, {
      password: hashPassw,
    });
    res.status(200).json({ message: 'Done', passwordUpdate });
  } catch (error) {
    res.status(400).json({ message: 'error', error });
  }
};

// ! user get  profile post  //
const GetProfile = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (user.isDelete === 'true') {
      res
        .status(401)
        .json({
          message:
            'You are not allowed to update the profile until the block ends',
        });
    }
    const post = await PostSchema.find({ createdBy: req.params.id });
    res.status(200).json({ message: 'Done', post });
  } catch (error) {
    res.status(200).json({ message: 'error', error });
  }
};

//! ===|> user can deactivate his account ===|> SoftDeleteUser
const deactivateAccount = async (req, res) => {
  try {
    let user = await UserSchema.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    res.status(200).json({ message: 'success', user });
  } catch (error) {
    res.status(400).json({ message: 'error', error });
  }
};

// ! === |> getAdver   <| ===
const getAdver = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.body.id);
    if (user.Block === 'true') {
      res
        .status(401)
        .json({ message: 'You are not allowed until the block ends' });
    }
    const adver = await advers
      .find({})
      .populate({ path: 'createdBy', select: 'username email' });
    res.status(200).json({ message: 'Done', adver });
  } catch (error) {
    res.status(400).json({ message: 'error', error });
  }
};

// ! === |> report  <| ===
const addReport = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.body.createByReport);
    if (user.Block === 'true') {
      res
        .status(401)
        .json({ message: 'You are not allowed until the block ends' });
    }
    const { Comment, PostWriterID, postID, createByReport } = req.body;
    const report = await Report.create({
      Comment,
      PostWriterID,
      postID,
      createByReport,
    });
    res.status(200).json({ message: 'AddReport', report });
  } catch (error) {
    res.status(400).json({ message: 'error', error });
  }
};

module.exports = {
  updateProfile,
  updatepassword,
  deactivateAccount,
  addReport,
  getAdver,
  GetProfile,
};
