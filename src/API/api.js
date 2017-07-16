import fetch from 'whatwg-fetch';

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

/* The functions that call the API
 * Each returns a promise
 */
function searchClaimsByTerm(searchTerm) {
  const searchResultsPromies = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/claims?search=${searchTerm}`, {
      headers: {
        Authorization: `Basic ${btoa('wiki:logic')}`,
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (res) {
        resolve(res.data);
      })
      .catch(function (err) {
        reject(err);
      });
  });

  return searchResultsPromies;
}

function getClaimDetailById(claimId) {
  const claimDetailPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/claims/${claimId}`, {
      headers: {
        Authorization: `Basic ${btoa('wiki:logic')}`,
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (res) {
        if (!Object.prototype.hasOwnProperty.call(res, 'claim')) {
          reject('404');
          return;
        }
        resolve(res.data);
      })
      .catch(function (err) {
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
        Authorization: `Basic ${btoa('wiki:logic')}`,
      },
      body: JSON.stringify(claim),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (err) {
        reject(err);
      });
  });

  return newClaimPromise;
}

function postNewArgument(argument) {
  console.log('API posting new argument: ', argument);
  const newArgumentPromise = new Promise((resolve, reject) => {
    fetch(`${apiRouteRoot}/create/argument`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('wiki:logic')}`,
      },
      body: JSON.stringify({
        parent_claim_id: argument.parent_claim_id,
        type: argument.type,
        premise_ids: argument.premise_ids,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (err) {
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
        Authorization: `Basic ${btoa('wiki:logic')}`,
      },
      body: JSON.stringify({
        parent_claim_id: argument.parent_claim_id,
        type: argument.type,
        premise_ids: argument.premise_ids,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (err) {
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
