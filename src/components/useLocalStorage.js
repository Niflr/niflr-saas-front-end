import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
 
 
 
  const [storedValue, setStoredValue] = useState(() => {
    
    try {
      const value = window.localStorage.getItem(keyName);
      if (value==null) {
        console.log("got user from local storeage",keyName,value)
        return JSON.parse(value);
      } 
      console.log("user from local storeage",value)
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;

    } catch (err) {
      return defaultValue;
    }
  });
  
  
  
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {console.log(err)}
    setStoredValue(newValue);
  };
  
  
  
  return [storedValue, setValue];
};