import { isChecked } from 'utils/filtering'

describe('utils - filtering', () => {
  describe('isChecked', () => {
    it('should be truthy for `checked` objects', () => {
      expect(isChecked({ checked: true })).toBeTruthy()
    })

    it('should be falsy for `unchecked` or invalid objects', () => {
      expect(isChecked({ checked: false })).toBeFalsy()
      expect(isChecked({ })).toBeFalsy()
      expect(isChecked()).toBeFalsy()
    })
  })
})
