/**
 * Handles keypresses matching different app functions
 * @param {Function} dispatch -- Redux dispatcher to handle different keypresses
 */
export const keyPress = dispatch => event => {
  {
    // Pull out the command or windows key depending on OS
    const ctrlDown = event.ctrlKey || event.metaKey;

    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
};
