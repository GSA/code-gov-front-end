import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'mocks/window';
import siteConfig from 'mocks/site.json';

// configure enzyme to react version 16
Enzyme.configure({ adapter: new Adapter() });

// global variables
global.PUBLIC_PATH = '/';
global.SITE_CONFIG = siteConfig;

// mock logging, use console.info or some other non mocked for logging in tests
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();
