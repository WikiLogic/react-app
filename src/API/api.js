import 'whatwg-fetch';
import AuthState from 'WlServices/authState.js';

const apiRouteRoot = '/api';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return null;
}

function parseJSON(response) {
  return response.json();
}

function formDataify(jsObj) {
  const formData = [];

  Object.keys(jsObj).forEach((key) => {
    formData.push(`${encodeURIComponent(key)}=${encodeURIComponent(jsObj[key])}`);
  });

  return formData.join('&');
}

/* The functions that call the API
 * Each returns a promise
 */
function apilogin(username, password) {
  const loggedInPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataify({
        name: username,
        password,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        AuthState.setToken(`JWT ${res.token}`);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return loggedInPromise;
}

function searchClaimsByTerm(searchTerm) {
  const searchResultsPromies = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/claims?search=${searchTerm}`, {
      headers: {
        Authorization: AuthState.getToken(),
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return searchResultsPromies;
}

function getClaimDetailById(claimId) {
  const claimDetailPromise = new Promise((resolve, reject) => {
    console.log('api claimId', claimId);
    fetch(`${apiRouteRoot}/claims/${claimId}`, {
      headers: {
        Authorization: AuthState.getToken(),
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log('api claim failed', err);
        reject(err);
      });
  });

  return claimDetailPromise;
}

function postNewClaim(claim) {
  const newClaimPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/create/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthState.getToken(),
      },
      body: JSON.stringify(claim),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return newClaimPromise;
}

function postNewArgument(argument) {
  const newArgumentPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/create/argument`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthState.getToken(),
      },
      body: JSON.stringify({
        parent_claim_id: argument.parent_claim_id,
        type: argument.type,
        premise_ids: argument.premise_ids,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return newArgumentPromise;
}

function postNewExplanation(argument) {
  const newExplanationPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/create/explanation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthState.getToken(),
      },
      body: JSON.stringify({
        parent_claim_id: argument.parent_claim_id,
        type: argument.type,
        premise_ids: argument.premise_ids,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return newExplanationPromise;
}

export default {
  searchClaimsByTerm,
  getClaimDetailById,
  postNewClaim,
  postNewArgument,
  postNewExplanation,
  apilogin,
};
