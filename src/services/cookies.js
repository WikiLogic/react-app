/**
 * Cookies!
 */

function get(name) {
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

function set(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}

export default {
  get,
  set,
};
