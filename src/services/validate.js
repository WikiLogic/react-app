

export function newPremis(newPremis, argument, parentClaim){
    //check 1 - is it the parent?
    if (newPremis.id == parentClaim.id) { return false; }

    //check 2 - is it a duplicate
    var isDuplicate = argument.premises.some(function(argPremis){
        return (argPremis.id == newPremis.id);
    });
    if (isDuplicate) { return false; }

    return true;
}