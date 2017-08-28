function objectToFormData(jsObj) {
  const formData = [];

  Object.keys(jsObj).forEach((key) => {
    formData.push(`${encodeURIComponent(key)}=${encodeURIComponent(jsObj[key])}`);
  });

  return formData.join('&');
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function apiResponceToJSON(response) {
  if (IsJsonString(response)) {
    return response.json();
  }
  return response;
}

export default {
  objectToFormData,
  apiResponceToJSON,
};
