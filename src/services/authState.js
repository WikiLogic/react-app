/**
 * Once you've logged in - pass this the details
 * This will give them back when needed
 * And it'll keep track of your logged in state!
 */

let user = false;
let token = false;

function getToken() {
  return token;
}

function setToken(newToken) {
  token = newToken;
}

function getUser() {
  return user;
}

function setUser(newUser) {
  user = newUser;
}

export default {
  getToken,
  setToken,
  getUser,
  setUser,
};
