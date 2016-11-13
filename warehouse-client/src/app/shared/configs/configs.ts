const isProduction = false;

export const Configs = {
  httpUrl: isProduction ? '' : 'http://127.0.0.1:80',
  socketUrl: isProduction ? '' : 'http://127.0.0.1:80'
};
