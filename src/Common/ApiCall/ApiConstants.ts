export const ApiConstants = {
  PROD_SERVER_URL: "http://localhost:3000",
  DEV_SERVER_URL: "http://localhost:3000",
  SERVER_NAMESPACE: '/api/v1',
  RUN_PROD_SERVER: true,
  LOCALHOST_SERVER: process.env.NODE_ENV === 'development',
  DEV_DOMAIN: 'localhost',
  PROD_DOMAIN: '.netlify.app',
  AUTH_COOKIE_NAME: process.env.NODE_ENV === 'development' ? 'awdawd' : 'awdhawdkbwia',
  AUTH_COOKIE_PATH: "/"
}

export function ServerURL(url = '') {
  const url_to_call = ( ApiConstants.LOCALHOST_SERVER ? ApiConstants.DEV_SERVER_URL : ApiConstants.PROD_SERVER_URL) + ApiConstants.SERVER_NAMESPACE + url
  return url_to_call
}