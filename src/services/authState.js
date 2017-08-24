/**
 * Once you've logged in - pass this the details
 * This will give them back when needed
 * And it'll keep track of your logged in state!
 */

let user = false;

function getCookie(name) {
  const cookieArray = document.cookie.split(';');

  for (let i = 0; i < cookieArray.length; i += 1) {
    const thisCookie = cookieArray[i];
    if (thisCookie.indexOf(name) !== -1) {
      const startSlice = thisCookie.indexOf(name) + name.length + 1;
      return thisCookie.substring(startSlice, thisCookie.length);
    }
  }

  return false;
}

function getToken() {
  const returnValue = getCookie('wlapi');
  console.log('returnValue', returnValue);
  return returnValue;
}

function setToken(newToken) {
  document.cookie = `wlapi=${newToken}; path=/`;
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
