// This file contains basic helper functions to make working with browser cookies easier.
// Since document.cookie is just a long text string, we write functions to set, read, and delete items.

// Function to save a cookie
export function setCookie(name, value, days) {
  let expires = "";
  
  // If the user specifies an expiration period (in days)
  if (days) {
    let date = new Date();
    // Convert days to milliseconds and add to current time
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  // Save the cookie formatted as "name=value; expires=date; path=/"
  // path=/ makes sure this cookie is readable on all pages of our website
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to read a cookie by its name
export function getCookie(name) {
  let nameEqual = name + "=";
  // document.cookie returns a single string like "cookie1=val1; cookie2=val2"
  // We split this string by the semicolon to inspect each cookie individually
  let cookieArray = document.cookie.split(";");
  
  for (let i = 0; i < cookieArray.length; i++) {
    let currentCookie = cookieArray[i];
    
    // Remove any leading spaces from the cookie string
    while (currentCookie.charAt(0) === " ") {
      currentCookie = currentCookie.substring(1, currentCookie.length);
    }
    
    // If the cookie starts with the name we want, return its value
    if (currentCookie.indexOf(nameEqual) === 0) {
      return currentCookie.substring(nameEqual.length, currentCookie.length);
    }
  }
  
  // Return null if cookie is not found
  return null;
}

// Function to delete a cookie
export function deleteCookie(name) {
  // We delete a cookie by setting its expiration date to a time in the past (e.g. Unix epoch start)
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
