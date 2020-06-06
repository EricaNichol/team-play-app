import { useState, useEffect } from 'react';


// Full disclosure, this regexp pattern code is from a source online
export function validateEmail (email) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}

export function usePersistedState(key, values) {
  // note to self: state is current state,
  // setState is a function that lets you update it.
  const [state, setState] = useState(() => {
    // look for the item in localStorage via the key:
    const persistedState = localStorage.getItem(key);

    // if there's no KEY, persistedState is the current value. Otherwise
    // JSON parse the persted state obj
    return persistedState ? JSON.parse(persistedState) : values;
  });

  // useEffect hook is for side effects (side computing work)
  // set the above , state in window storage
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}
