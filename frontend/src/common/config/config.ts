const { MODE, VITE_APP_PROXY_SERVER_URL, VITE_APP_API_ORIGIN_URL } = import.meta
  .env;

const config = {
  MODE,
  API_URL: VITE_APP_PROXY_SERVER_URL,
  ORIGIN_PATH: VITE_APP_API_ORIGIN_URL,
};

export { config };
