import { UPDATE_TASK_FILTERS } from 'constants/actions'

export default function(category, value, change) {
  const intent = change === 'checked' ? 'add' : 'remove'
  return { type: UPDATE_TASK_FILTERS, category, value, intent }
}
