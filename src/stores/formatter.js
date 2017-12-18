function objectToFormData(jsObj) {
  const formData = [];

  Object.keys(jsObj).forEach((key) => {
    formData.push(`${encodeURIComponent(key)}=${encodeURIComponent(jsObj[key])}`);
  });

  return formData.join('&');
}

function apiResponceToJSON(response) {
  if (response.status === 401) {
    return 'request unauthorized - try logging in';
  }
  if (response.status === 500) {
    return 'server error, check the netowrk tab in the dev tools for more details';
  }

  let returnObject;
  try {
    returnObject = response.json();
  } catch (e) {
    returnObject = {
      error: e,
      response,
    };
  }
  return returnObject;
}

export default {
  objectToFormData,
  apiResponceToJSON,
};
