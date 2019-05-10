import loadProject from 'actions/load-project'
import { mapStateToProps, mapDispatchToProps } from 'components/project-page/project-page.container'

jest.mock('actions/load-project')

const props = {
  project: 'test-project',
}

const dispatch = jest.fn()

describe('containers - ProjectPage', () => {
  describe('mapStateToProps', () => {
    it('should return the correct properties', () => {
      expect(mapStateToProps(props)).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    describe('updateProject', () => {
      it('should dispatch the `loadProject` action with the correct params', () => {
        mapDispatchToProps(dispatch).updateProject('repo-id')
        expect(dispatch).toBeCalled()
        expect(loadProject).toBeCalledWith('repo-id')
      })
    })
  })
})
