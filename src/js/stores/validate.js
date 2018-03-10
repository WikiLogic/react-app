function newPremis(newPremisObj, argument, parentClaim) {
    // check 1 - is it the parent?
    if (newPremisObj.id === parentClaim.id) {
        return false;
    }

    // check 2 - is it a duplicate
    const isDuplicate = argument.premises.some(argPremis => {
        if (argPremis.id === newPremisObj.id) {
            return true;
        }
        return false;
    });

    if (isDuplicate) {
        return false;
    }
    return true;
}

export default {
    newPremis
};
