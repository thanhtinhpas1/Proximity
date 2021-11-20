import { Platform } from 'react-native';

const {
  author: {
    name,
    email,
    url
  },
  repository: {
    url: repository
  },
  version
} = require('../../package.json');

const codepush = {
  staging: Platform.select({
    ios: 'oa4DnS5bWcdKfrn6-hFW0IM0cxz_ND0HjltT7',
    android: 'Iz1BBAYspY9VD86eAEaaZKCAatx94o8euMgaX'
  }),
  production: Platform.select({
    ios: 'SVCEKMZ6XPV9-CNIapN2-4UlLuoh-sJrX9L5i',
    android: 'CazhWsogurvhEf16g4IJnpil2n29Hza2Jojdf'
  })
};

const webClientId: string = '890341145128-vf62gsp2k9nc1t5l9d1bm8c51ds7gh99.apps.googleusercontent.com';

const Config = {
  author: { name, email, url },
  repository,
  version,
  codepush,
  url: {
    http: 'http://172.16.0.141:8080/',
    wss: 'ws://172.16.0.141:8080/',
  },
  webClientId
};

export default Config;
