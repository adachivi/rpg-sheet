// Utility file

/* Autofills the rest of the checkboxes of an attribute based on which one was marked
   Also updates the sheet's attribute numeric value                                   */
export const handleCheckboxes = (attr, index, attrCheckboxes, setAttrCheckboxes, setSheet) => {
    const updatedAttrCheckboxes = [...attrCheckboxes[attr]];
    var attrValue;
    for (let i = 0; i < 5; i++) {
        if (i < index) {
            updatedAttrCheckboxes[i] = true;
        }
        else if (i == index) {
            if (index == 0 && updatedAttrCheckboxes[0] == true && updatedAttrCheckboxes[1] != true) {
                updatedAttrCheckboxes[i] = false;
                attrValue = index;
            }
            else {
                updatedAttrCheckboxes[i] = true;
                attrValue = index + 1;
            }
        }
        else {
            updatedAttrCheckboxes[i] = false;
        }
    };
    
    setAttrCheckboxes((prev) => ({...prev, [attr]: updatedAttrCheckboxes}));
    setSheet((prev) => ({...prev, [attr]: attrValue}));
}

// Update a text value from a state
export const handleTextInputChange = (key, event, setSheet) => {
    const newValue = event.target.value; // Get the new value inputted
    setSheet((prev) => ({...prev, [key]: newValue}));
}

// Initialize checkboxes according to it's attribute value
export const initializeCheckboxes = (attr, attrValue, attrCheckboxes, setAttrCheckboxes) => {
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