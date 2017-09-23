//The idea here is to hold onto all the notifications that happen
//somehow changes in state here should trigger a rendering in the react part
//think we should wait until something like redux is set up before going any further.

const notes = [];
const timeout = 10;

function remove(note) {
  for (let n = 0; n < notes.length; n++) {
    if (notes[n].title === note) {
      notes[n].clearTimer();
      notes.splice(n, 1);
    }
  }
}

function post(message) {

  const notification = (() => {
    let counter = 0;

    const timer = setInterval(() => {
      counter += 1;
      if (counter > timeout) {
        remove(message);
      }
    }, 1000);

    return {
      title: message,
      clearTimer: () => {
        clearInterval(timer);
      }
    };
  })();

  notes.push(notification);
}

export default {
  post,
};
