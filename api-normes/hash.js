const bcrypt = require("bcryptjs");

bcrypt.hash("qwerty", 10).then((hash) => {
  console.log("mot de passe hache : ", hash);
});
