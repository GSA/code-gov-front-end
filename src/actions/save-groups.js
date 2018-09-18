import { SAVE_GROUPS } from 'constants/actions';

export default function (groups) {
  return { type: SAVE_GROUPS, groups };
}