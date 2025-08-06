// Utility file

// Updates the sheet's attribute value when a checkbox is clicked
export const handleCheckboxClick = (attr, index, attrCheckboxes, setSheet) => {

    const checkboxes = [...attrCheckboxes[attr]];
    if (index == 0 && checkboxes[0] == true && checkboxes[1] != true) {
        setSheet((prev) => ({...prev, [attr]: index}));
    }
    else {
        setSheet((prev) => ({...prev, [attr]: (index + 1)}));
    }

}

// Checks the checkboxes according to it's attribute value
export const handleCheckboxes = (attr, attrValue, attrCheckboxes, setAttrCheckboxes) => {

    const initializedAttrCheckboxes = [...attrCheckboxes[attr]];
    for (let i = 0; i < 5; i++) {
        if (i <= (attrValue - 1)) {
            initializedAttrCheckboxes[i] = true;
        }
        else {
            initializedAttrCheckboxes[i] = false;
        }
    };

    setAttrCheckboxes((prev) => ({...prev, [attr]: initializedAttrCheckboxes}));

}

// Update a text value from a state
export const handleTextInputChange = (key, event, setSheet) => {

    const newValue = event.target.value; // Get the new value inputted
    setSheet((prev) => ({...prev, [key]: newValue}));

}

// Verify if the player's name is valid: has at least 2 letters
export const verifyPlayerNameInput = (playerName) => {

    let alphabeticalRegex = /[A-Za-z]{2,}/;

    if (alphabeticalRegex.test(playerName) == true) {
        return true;
    }
    else {
        return false;
    }

}