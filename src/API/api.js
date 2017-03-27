"use strict";
import eventManager from '../eventManager/eventManager.js';
import actions from '../eventManager/actions.js';
import 'whatwg-fetch';

/* This is where we talk to the WikiLogic API
 *
 */

eventManager.subscribe(actions.SEARCH_TERM_SUBMITTED, function(term){

    //tell the world we're submitting a search (for spinners and the like)
    eventManager.fire(actions.API_SEARCH_SUBMITTED, term);

    fetch( "http://localhost:3030/claims?search=" + term)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(res) {
        eventManager.fire(actions.API_RETURNED_CLAIMS, res.data);
    })
    .catch(function(err){
        eventManager.fire(actions.API_ERRORED, err);
        console.error('API error', err);
    });
});

eventManager.subscribe(actions.SEARCH_NUMBER_SUBMITTED, function(claimid){
    //going to assume it's a claim ID for now

    //tell the world we're submitting a search (for spinners and the like)
    eventManager.fire(actions.API_REQUEST_BY_ID_SUBMITTED, claimid);

    fetch( "http://localhost:3030/claims/" + claimid)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(res) {
        if (!res.data.hasOwnProperty('claim')) {
            eventManager.fire(actions.API_REQUEST_BY_ID_ERRORED, '404');
            return;
        }
        //console.error('res.data', res.data);
        eventManager.fire(actions.API_REQUEST_BY_ID_RETURNED, res.data);
    })
    .catch(function(err){
        eventManager.fire(actions.API_ERRORED, err);
        console.error('API error', err);
    });
});

eventManager.subscribe(actions.ARG_REQUEST_BY_ID_SUBMITTED, function (claimid) {

    //tell the world we're submitting a search (for spinners and the like)
    eventManager.fire(actions.API_REQUEST_BY_ID_SUBMITTED, claimid);

    getClaimDetailById(claimid);
});

function searchClaimsByTerm(searchTerm){

    let searchResultsPromies = new Promise((resolve, reject) => {
        fetch( "http://localhost:3030/claims?search=" + searchTerm)
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
        fetch("http://localhost:3030/claims/" + claimId)
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
    init: function(){
        //ping the API & see if it's alive
    },
    searchClaimsByTerm,
    getClaimDetailById
}