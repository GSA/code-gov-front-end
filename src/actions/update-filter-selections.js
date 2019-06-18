import { SAVE_FILTER_SELECTIONS } from 'constants/actions'

export default function(selections) {
  return { type: SAVE_FILTER_SELECTIONS, selections }
}
