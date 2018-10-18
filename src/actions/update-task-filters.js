import { UPDATE_TASK_FILTERS } from 'constants/actions';

export default function (category, values) {
  return { type: UPDATE_TASK_FILTERS, category, values };
}
