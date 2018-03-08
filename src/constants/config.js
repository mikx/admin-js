const devMode = (process.env.NODE_ENV !== 'development');

export default {

  // App Details
  appName: 'Admin',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // server url
  base: `http://${process.env.C9_HOSTNAME}:7070/`,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-113156574-1' : 'UA-113156574-1',

};
