const isProduction = false;

export const Configs = {
  httpUrl: isProduction ? 'https://happy2c.com' : 'https://127.0.0.1:3000',
  socketUrl: isProduction ? 'https://happy2c.com' : 'https://127.0.0.1:3000'
};
