import { SAVE_AGENCIES } from 'constants/actions';

export default function (agencies) {
  return { type: SAVE_AGENCIES, agencies };
}