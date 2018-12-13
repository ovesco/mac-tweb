export default (value) => {
    const bytes = parseInt(value, 10);
    const sizes = ['', 'Kb', 'Mb', 'Gb', 'Tb'];
    if (bytes === 0) return '0';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round((bytes / (1024 ** i)) * 10) / 10} ${sizes[i]}`;
};
