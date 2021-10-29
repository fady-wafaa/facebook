const UserSchema = require('../../../models/user.schema');
require('dotenv').config();
const { compareing, hashing } = require('../../../helpers/hashing/hashing');
const { signToken } = require('../../../helpers/token/token.js');
const sendEmail = require('../../../helpers/Email/sendEmail');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { nanoid } = require('nanoid');

// ! === |> REGISTER <| ===
const addUser = async (req, res) => {
  try {
    const { username, email, password, phone, location, roles } = req.body;
    const user = await UserSchema.findOne({ email });
    if (user) {
      res.status(401).json({ message: 'email is aleardy exisst' });
    }
    const hashPassw = await hashing(password);
    const hashpho = await hashing(phone);
    const data = await UserSchema.create({
      username,
      email,
      phone: hashpho,
      password: hashPassw,
      location,
      roles,
    });
    const token = await signToken({ email });
    let message = `<a href= '${
      process.env.URL_PROJ + token
    }'> virfy account</a>`;
    await sendEmail(email, message);

    res.status(201).json({ message: 'success', data });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};

// ! ===>  GoogleLogin  <===
const GoogleLogin = async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.OAuth);
    const { tokenId, googleId } = req.body;
    let { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience:process.env.OAuth
    });
    console.log(payload);
    if (payload.email_verified) {
      const user = await UserSchema.findOne({ googleId });
      
      if(user){
        //   const token = jwt.sign({_id:user._id,role:user.role})
          const token = signToken({_id:user._id,role:user.role});
          res.status(200).json({ message: 'success', token, });
      }else{
          const newUser = await UserSchema.create({username:payload.name,email:payload.email,confirmed:true,password:nanoid()}) 
          const token = signToken(newUser);
          res.status(200).json({ message: 'success', token });
      }
    } else {
        res.status(400).json({message:"email not verified"})
    }
  } catch (error) {
    console.log(error);
  }
};

// ! logIn verfy Email //
const logInEmail = async (req, res) => {
  try {
    let { token } = req.params;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          res.json({ error: 'in-valid signature' });
        } else {
          const user = await UserSchema.findOne({ email: decoded.email });
          if (user) {
            if (user.confirmed) {
              res.json({ error: 'in-valid confirmed Email' });
            } else {
              const updateUser = await UserSchema.findOneAndUpdate(
                { email: user.email },
                { confirmed: true },
                { new: true }
              );
              res.json({ message: 'confirmed', updateUser });
            }
            //! res.redirect === |> hendeler in react redirct to home or logIN  <| === //
          } else {
            res.json({ error: 'in-valid user' });
          }
        }
      });
    } else {
      res.json({ error: 'in-valid token' });
    }
  } catch (error) {
    res.json({ error: 'in-valid token' });
  }
};

// ! ===|> Log In <|===
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });

    if (user.confirmed === false) {
      res
        .status(401)
        .json({
          message: 'There is no account. Please confirmed Email a account ',
        });
    }
    if (user.isDelete === true) {
      res
        .status(401)
        .json({
          message: 'There is no account. Please register an account again',
        });
    }

    if (!user) {
      res.status(401).json({ message: 'email is aleardy exisst' });
    }
    if (user.confirmed === false) {
      res.status(401).json({ message: 'you have to confirm you email first' });
    }
    const matchPassword = await compareing(password, user.password);
    if (!matchPassword) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
    const { _id, username, location, phone, roles } = user;
    const token = await signToken({
      _id,
      username,
      location,
      phone,
      roles,
      email,
    });
    res.status(200).json({ message: 'logIn success', data: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// ! signUP google //

module.exports = {
  addUser,
  logIn,
  logInEmail,
  GoogleLogin,
};
