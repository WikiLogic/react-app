"use strict";
/* All the actions (events) that can be fired
 * Inspired by http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * Build errors are better than run time errors
 */

export default {
    SEARCH_TERM_SUBMITTED: "SEARCH_TERM_SUBMITTED",
    SEARCH_NUMBER_SUBMITTED: "SEARCH_NUMBER_SUBMITTED",
    API_RETURNED_CLAIMS: "API_RETURNED_CLAIMS",
    API_RETURNED_CLAIM: "API_RETURNED_CLAIM",
    API_RETURNED_ERROR: "API_RETURNED_ERROR",
    API_SEARCH_SUBMITTED: "API_SEARCH_SUBMITTED",
    API_SEARCH_RETURNED: "API_SEARCH_RETURNED",
    API_SEARCH_ERRORED: "API_SEARCH_ERRORED",
    CLAIM_REQUEST_BY_ID_SUBMITTED: "CLAIM_REQUEST_BY_ID_SUBMITTED",
    API_REQUEST_BY_ID_SUBMITTED: "API_REQUEST_BY_ID_SUBMITTED",
    API_REQUEST_BY_ID_RETURNED: "API_REQUEST_BY_ID_RETURNED",
    API_REQUEST_BY_ID_ERRORED: "API_REQUEST_BY_ID_ERRORED",
    NODE_UP_CLICKED: "NODE_UP_CLICKED",
    NODE_LEFT_CLICKED: "NODE_LEFT_CLICKED",
    NODE_RIGHT_CLICKED: "NODE_RIGHT_CLICKED",
    NODE_DOWN_CLICKED: "NODE_DOWN_CLICKED",
    API_ARG_REQUEST_BY_ID_RETURNED : "API_ARG_REQUEST_BY_ID_RETURNED"
}