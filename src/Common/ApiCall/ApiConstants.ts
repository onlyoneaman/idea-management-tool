export const ApiConstants = {
  PROD_SERVER_URL: 'https://dev.influencerbit.com',
  DEV_SERVER_URL:/* "http://localhost:3000" ?? */'https://dev.influencerbit.com' ?? "http://localhost:3000",
  SERVER_NAMESPACE: '',
  RUN_PROD_SERVER: true,
  LOCALHOST_SERVER: process.env.NODE_ENV === 'development',
  DEV_DOMAIN: 'localhost',
  PROD_DOMAIN: '.influencerbit.com',
  AUTH_COOKIE_NAME: process.env.NODE_ENV === 'development' ? 'ibDevMainAppAuthToken' : 'ibMainAppAuthToken',
  AUTH_COOKIE_PATH: "/"
}

export function ServerURL(url = '') {
  const url_to_call = ( ApiConstants.LOCALHOST_SERVER ? ApiConstants.DEV_SERVER_URL : ApiConstants.PROD_SERVER_URL) + url
  return url_to_call
}