const User = require("../model/User");

const handleLogout = async (req, res) => {
  //on client, also delete the refresh token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content code
  const refreshToken = cookies.jwt;
  //is tefresh token in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }
  //delete the refresh token in the db

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
