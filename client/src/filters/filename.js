export default (value, strlen) => {
    const length = strlen || 15;
    if (value.length < strlen) return value;
    const ext = value.split('.').pop();
    return `${value.substr(0, length - 1 - ext.length)}..${ext}`;
};
