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

export { checkForm, useQuery };