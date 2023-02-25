/**
 * Adds a DFS remove function to arrays
 */
Array.prototype.remove = function () {
  // Set the arguments length
  let length = arguments.length;

  // Allocate the search and found memory
  let search, found;

  // Search while there are arguments and we are not finished with the array
  while (length && this.length) {
    // Set the search to the last element of the argument list
    search = arguments[--length];

    // Search the array for the current term
    while ((found = this.indexOf(search)) !== -1) {
      // Remove the search term when found
      this.splice(found, 1);
    }
  }

  // Return the modified array
  return this;
};
