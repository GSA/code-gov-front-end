import { SAVE_SITE_CONFIG } from 'constants/actions';

export default function (siteConfig) {
  return { type: SAVE_SITE_CONFIG, siteConfig };
}