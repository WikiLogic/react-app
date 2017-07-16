function addToQueryString(queryString, paramName, value) {
  if (queryString.length > 0) {
    // there's something in the querystring, I'm going to assume it's a properly formed parameter
    return `${queryString}&${paramName}=${value}`;
  }
  // guess there's nothing there, no need to '&'
  return `?${paramName}=${value}`;
}

function removeQueryFromString(queryString, paramName) {
  // find the index of paramName 
  // (note that the param name could be a substring of another param name)
  // include the "?" and "=" to help negate the substring problem
  let startSlice = queryString.indexOf(`?${paramName}=`);
  if (startSlice === -1) {
    // it's not the first param, but it could be further along
    startSlice = queryString.indexOf(`&${paramName}=`);
    if (startSlice === -1) {
      // it's not there either, just return the string
      return queryString;
    }
  }

  // shift the index of the start slice along past the '?' or '&'
  startSlice += 1;

  // find index of the next &
  let endSlice = queryString.indexOf(`&${startSlice}`);
  if (endSlice === -1) {
    // it's the last / only one!
    // -1 to lop of the preceeding "?" if it's the only one or "&" if it's the last one
    return queryString.substr(0, startSlice - 1);
  }

  if (endSlice < queryString.length) {
    // we're in the middle, add to end slice so it'll lop off one of the "&"'s
    endSlice += 1;
  }

  // if we're here - the param is one of many - return the slice before & after the param
  return queryString.substr(0, startSlice) + queryString.substr(endSlice, queryString.length);
}

function formatStringForUrl(unsafeString) {
  // note: I've tried a bunch of alternate methods to replace characters, 
  // none have managed to beat the regex.
  let saferString = unsafeString.replace(/ /g, '%20');
  saferString = saferString.replace(/&/g, '%26');
  saferString = saferString.replace(/\//g, '%2F');

  return saferString;
}

export default {
  get(paramName, queryString) {
    if (typeof paramName !== 'string' || typeof queryString !== 'string') {
      return false;
    }

    // find the index of paramName
    let startSlice = queryString.indexOf(paramName);
    if (startSlice === -1) {
      // it's not in there, return false
      return false;
    }
    // start slice for the actual value. Param name + "="
    startSlice = startSlice + paramName.length + 1;

    // find index of the next &
    const endSlice = queryString.indexOf('&', startSlice);
    if (endSlice === -1) {
      // it's the last / only one!
      return queryString.substr(startSlice, queryString.length);
    }

    // end slice is index. substr needs length
    return queryString.substr(startSlice, endSlice - startSlice);
  },
  set(paramName, value, queryString, isEncoded) {
    let formattedParamName;
    let formattedValue;

    if (typeof paramName !== 'string') {
      return false;
    }

    const cleanQueryString = removeQueryFromString(queryString, paramName);
    if (value === '') {
      return cleanQueryString;
    }

    if (!isEncoded) {
      // param name and value have passed, so format them 
      formattedParamName = formatStringForUrl(paramName);
      formattedValue = formatStringForUrl(value);
    } else {
      formattedParamName = paramName;
      formattedValue = value;
    }

    // and return the new string!
    const newQuery = addToQueryString(cleanQueryString, formattedParamName, formattedValue);

    return newQuery;
  },
};
