const requests = new Map();

const addRequest = (phone, message) => {
    requests.set(phone, message);
};

const requestExists = (phone) => {
    return requests.has(phone);
};

module.exports = {
    addRequest,
    requestExists,
};
