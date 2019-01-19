
import { BACKEND_CONFIG } from '../../configs';
let baseUrl;
if (process.env.NODE_ENV === 'development' || process.env.DEPLOY_TO === 'test') {
  baseUrl = BACKEND_CONFIG.URL;
} else {
  baseUrl = BACKEND_CONFIG.URL;
}
/** API ENDPOINTS */
export const API = {
  BASEURL: baseUrl,
  EVENTS: '/events/',
  // CLIENTI: '/customer',
};

