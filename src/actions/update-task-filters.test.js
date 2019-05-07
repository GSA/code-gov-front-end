import { UPDATE_TASK_FILTERS } from 'constants/actions'
import updateTaskFilters from 'actions/update-task-filters'

describe('actions - update-browse-filters', () => {
  it('should return an object containing the `UPDATE_TASK_FILTERS` type', () => {
    expect(updateTaskFilters().type).toBe(UPDATE_TASK_FILTERS)
  })

  it('should return the first param as `category`', () => {
    expect(updateTaskFilters('category').category).toBe('category')
  })

  it('should return the second param as `value`', () => {
    expect(updateTaskFilters('category', 'value').value).toBe('value')
  })

  it('should return an `intent` of `add` if the thrid param is `checked`', () => {
    expect(updateTaskFilters('category', 'value', 'checked').intent).toBe('add')
  })

  it('should return an `intent` of `remove` if the thrid param is not `checked`', () => {
    expect(updateTaskFilters('category', 'value', 'not checked').intent).toBe('remove')
  })
})