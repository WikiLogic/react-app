"use strict";
import eventManager from '../eventManager/eventManager.js';
import actions from '../eventManager/actions.js';
import 'whatwg-fetch';

var apiRouteRoot = "http://localhost:3030/api";

/* The functions that call the API
 * Each returns a promise
 */
function searchClaimsByTerm(searchTerm){

    let searchResultsPromies = new Promise((resolve, reject) => {
        fetch(apiRouteRoot + "/claims?search=" + searchTerm)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(res) {
            resolve(res.data);
        })
        .catch(function(err){
            reject(err);
            console.error('API error', err);
        });
    });

    return searchResultsPromies;
}

function getClaimDetailById(claimId){

    let claimDetailPromise = new Promise((resolve, reject) => {
        fetch(apiRouteRoot + "/claims/" + claimId)
        .then(checkStatus)
        .then(parseJSON)
        .then(function (res) {
            if (!res.data.hasOwnProperty('claim')) {
                reject('404');
                //eventManager.fire(actions.API_REQUEST_BY_ID_ERRORED, '404');
                return;
            }
            resolve(res.data);
        })
        .catch(function (err) {
            reject(err);
            //eventManager.fire(actions.API_ERRORED, err);
            console.error('API error', err);
        });
    });

    return claimDetailPromise;
}

function postNewClaim(claim){
    let newClaimPromise = new Promise((resolve, reject) => {
        fetch(apiRouteRoot + "/create/claim", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(claim)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (res) {
            resolve(res);
        })
        .catch(function (err) {
            reject(err);
            //eventManager.fire(actions.API_ERRORED, err);
            console.error('API error', err);
        });
    });

    return newClaimPromise;
}

function postNewArgument(argument){
    let newArgumentPromise = new Promise((resolve, reject) => {
        fetch(apiRouteRoot + "/create/argument", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent_claim_id: argument.parent_claim_id,
                type: argument.type,
                premise_ids: argument.premise_ids
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (res) {
            resolve(res);
        })
        .catch(function (err) {
            reject(err);
            //eventManager.fire(actions.API_ERRORED, err);
            console.error('API error', err);
        });
    });

    return newArgumentPromise;
}

function postNewExplanation(argument) {
    let newExplanationPromise = new Promise((resolve, reject) => {
        fetch(apiRouteRoot + "/create/explanation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent_claim_id: argument.parent_claim_id,
                type: argument.type,
                premise_ids: argument.premise_ids
            })
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(function (res) {
                resolve(res);
            })
            .catch(function (err) {
                reject(err);
                //eventManager.fire(actions.API_ERRORED, err);
                console.error('API error', err);
            });
    });

    return newExplanationPromise;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    eventManager.fire(actions.API_RETURNED_ERROR, response);
  }
}

function parseJSON(response) {
  return response.json()
}

export default {
    searchClaimsByTerm,
    getClaimDetailById,
    postNewClaim,
    postNewArgument,
    postNewExplanation
}