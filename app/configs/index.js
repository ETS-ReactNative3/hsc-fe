/*
 * HSC ConfigFile
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONFIG = 'yourproject/YourContainer/YOUR_ACTION_CONFIG';
 */

let OBJ_FRONTEND;
let OBJ_BACKEND;

if (process.env.NODE_ENV === 'production') {
  const url = '';
  OBJ_FRONTEND = {
    URL: url,
    CLIENT_ID: 'admin',
    CLIENT_SECRET: '123456',
  };
  OBJ_BACKEND = {
    URL: `${url}api`,
  };
} else {
  OBJ_FRONTEND = {
    URL: 'http://localhost:3000',
    CLIENT_ID: 'admin',
    CLIENT_SECRET: '123456',
  };
  OBJ_BACKEND = {
    URL: '',
  };
}
const FRONTEND_CONFIG = OBJ_FRONTEND;
const BACKEND_CONFIG = OBJ_BACKEND;

export { FRONTEND_CONFIG, BACKEND_CONFIG };
