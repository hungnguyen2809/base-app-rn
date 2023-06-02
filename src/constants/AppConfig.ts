type EnvMode = 'develop' | 'product';
type EnvConfig = {
  [key in EnvMode]?: string;
};

const APP_MODE: EnvMode = 'develop';

const APP_ENV: EnvConfig = {
  product: '',
  develop: 'Phát triển',
};

const APP_URL: EnvConfig = {
  develop: '',
  product: '',
};

export const AppConfig = {
  APP_MODE,
  APP_ENV,
  APP_URL,
};
