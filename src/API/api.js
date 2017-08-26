import 'whatwg-fetch';
import Cookies from 'WlServices/cookies.js';
import Formatter from 'WlServices/formatter.js';

const apiRouteRoot = '/api';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return null;
}

function searchClaimsByTerm(searchTerm) {
  const searchResultsPromies = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/claims?search=${searchTerm}`, {
      headers: {
        Authorization: Cookies.get('JWT'),
      },
    })
      .then(checkStatus)
      .then(Formatter.apiResponceToJSON)
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
    fetch(`${apiRouteRoot}/claims/${claimId}`, {
      headers: {
        Authorization: Cookies.get('JWT'),
      },
    })
      .then(checkStatus)
      .then(Formatter.apiResponceToJSON)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.err('api claim failed', err);
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
        Authorization: Cookies.get('JWT'),
      },
      body: JSON.stringify(claim),
    })
      .then(checkStatus)
      .then(parseFormatter.apiResponceToJSONJSON)
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
        Authorization: Cookies.get('JWT'),
      },
      body: JSON.stringify({
        parent_claim_id: argument.parent_claim_id,
        type: argument.type,
        premise_ids: argument.premise_ids,
      }),
    })
      .then(checkStatus)
      .then(Formatter.apiResponceToJSON)
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
        Authorization: Cookies.get('JWT'),
      },
      body: JSON.stringify({
        parent_claim_id: argument.parent_claim_id,
        type: argument.type,
        premise_ids: argument.premise_ids,
      }),
    })
      .then(checkStatus)
      .then(Formatter.apiResponceToJSON)
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
};
