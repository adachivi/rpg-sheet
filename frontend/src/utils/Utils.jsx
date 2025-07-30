// Utility files (reusable functions)

// Update a text value from a state
export const handleTextInputChange = (key, event, setSheet) => {
    const newValue = event.target.value; // Get the new value inputted
    setSheet((prev) => ({...prev, [key]: newValue}));
}

/* Verify if the player's name is valid:
   has at least 2 letters                */
export const verifyPlayerNameInput = (playerName) => {
    let alphabeticalRegex = /[A-Za-z]{2,}/;

    if (alphabeticalRegex.test(playerName) == true) {
        return true;
    }
    else {
        return false;
    }
}