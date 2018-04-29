const createSelectsOptions = (obj) => Object.keys(obj).map(key => ({ title: obj[key], id: obj[key] }));

export default createSelectsOptions;
