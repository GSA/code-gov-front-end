import { CLEAR_SITE_CONFIG, SAVE_SITE_CONFIG } from 'constants/actions';

export default function (state = null, action) {
  switch(action.type) {
    case CLEAR_SITE_CONFIG:
      return null;
    case SAVE_SITE_CONFIG:
      return action.siteConfig;
    default:
      return state;
  }
}