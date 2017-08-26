function objectToFormData(jsObj) {
  const formData = [];

  Object.keys(jsObj).forEach((key) => {
    formData.push(`${encodeURIComponent(key)}=${encodeURIComponent(jsObj[key])}`);
  });

  return formData.join('&');
}

function apiResponceToJSON(response) {
  console.log('response', response);
  return response.json();
}

export default {
  objectToFormData,
  apiResponceToJSON,
};
