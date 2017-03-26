"use strict";

/* The Event Manager
 * each type of event that is subscribed to becomes an array by the same name
 * That array holds all the functions that have subscribed to the event
 * So when the event fires, those functions will be run
 * When firing an event, you can also pass in data that will be accessible to the subscribers
 * Try not to mutate that data, you never know who else might be expecting it.
 */

var eventSubscribers = {};

var addSubscriber = function(event, subscriber){
    if (eventSubscribers[event]) {
        eventSubscribers[event].push(subscriber);
    } else {
        eventSubscribers[event] = [subscriber];
    }
    return eventSubscribers[event].length - 1;
}

function subscribe(event, subscriber){
    /* Takes the name of an event to subscribe to
     * and a function to run when that event is fired.
     * An index number is returned. This will be needed if 
     * the subscriber is ever to be removed. (or we could implement some other kind of id system?)
     */
    if (event instanceof Array){
        for (var e = 0; e < event.length; e++) {
            addSubscriber(event[e], subscriber);
        }
    } else {
        addSubscriber(event, subscriber);
    }

};

function unsubscribe(event, index){
    eventSubscribers[event].splice(index, 1);
};

function fire(event, data){
    //console.log('EVENT:', event, data);
    setTimeout(function(){
        console.group('EVENT', event, data);
        if (eventSubscribers[event]) {
            for (var s = 0; s < eventSubscribers[event].length; s++) { //s for subscriber
                try {
                    eventSubscribers[event][s](data);
                }
                catch(err) {
                    console.error('err: ', err);
                }
            }
        }
        console.groupEnd();
    }, 0);
};


export default {
    subscribe,
    fire
}