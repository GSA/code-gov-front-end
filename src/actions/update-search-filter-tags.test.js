import { UPDATE_SEARCH_FILTER_TAGS } from 'constants/actions'
import updateSearchFilterTags from 'actions/update-search-filter-tags'

describe('actions - update-search-filter-tags', () => {
  it('should return an object containing the `UPDATE_SEARCH_FILTER_TAGS` type', () => {
    expect(updateSearchFilterTags().type).toBe(UPDATE_SEARCH_FILTER_TAGS)
  })

  it('should set the first param as `tags`', () => {
    expect(updateSearchFilterTags('test-tags').tags).toBe('test-tags')
  })
})