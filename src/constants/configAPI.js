const env = process.env || {};
const envVariables = [
  'REACT_APP_API_AUTH'
];

const defaultValueConfig = {
  REACT_APP_API_AUTH: 'https://cued-in-api.greenglobal.vn/'
};

const config = {};

const getConfigName = (name) => {
  const configSplit = name.split('REACT_APP_');
  if (configSplit.length === 2) {
    return configSplit[1];
  }
  return '';
};

envVariables.forEach((name) => {
  if (!env[name]) {
    console.warn(`Environment variable ${name} is missing, use default instead.`);
  }
  const configName = getConfigName(name);
  if (configName) {
    config[configName] = env[name] || defaultValueConfig[name] || '';
  }
});

export default config;
