export default (value, strlen) => {
    const length = strlen || 15;
    if (value.length < strlen) return value;
    const extension = value.split('.').pop();
    if ((value.length - extension.len + 4) < length) return value;
    return `${value.substr(0, length - 4 - extension.length)}...${extension}`;
};
