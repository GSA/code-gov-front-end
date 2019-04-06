import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import 'mocks/window'
import 'mocks/date'
import 'mocks/console'
import siteConfig from '../config/site/site.json'

jest.mock('api-client')

// configure enzyme to react version 16
Enzyme.configure({ adapter: new Adapter() })

// global variables
global.PUBLIC_PATH = '/'
global.SITE_CONFIG = siteConfig