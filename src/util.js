const checkForm = ({ formErrors }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    return valid;
};

function useQuery() {
    let obj = new URLSearchParams(window.location.search);
    let res = {}
    for (const [key, value] of obj) {
        res[key] = value;
    }
    return (res);
}

function fixedParseInt(str) {
    if (str === "") //Normally if the string is empty the function parseInt should return 0 but JS decied that it wants to be an annoying peace of shit!!!
        return (0);
    return (parseInt(str));
}

export { checkForm, useQuery, fixedParseInt };