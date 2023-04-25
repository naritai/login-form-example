import { useState, useEffect } from "react";

const getLocalValue = (key, initialValue) => {
  // SSR
  if (typeof window === 'undefined') {
    return initialValue;
  }

  // If value already exist
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) {
    return localValue;
  }

  // return result of a function
  if (typeof initialValue === 'function') {
    return initialValue();
  }

  return initialValue;
}

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalStorage };