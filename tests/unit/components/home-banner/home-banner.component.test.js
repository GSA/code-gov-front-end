import React from 'react';
import { shallow } from 'enzyme';

import HomeBanner from 'components/home-banner/home-banner.component';

const props = {
  agencies: [
    { acronym: 'a1', name: 'agency-1' },
    { acronym: 'a2', name: 'agency-2' },
  ],
  saveAgencies: jest.fn(),
  motto: 'test-motto',
  subtitle: 'test-subtitle',
  backgroundImage: 'test-bg-image',
  onBrowseByEntityChange: jest.fn(),
  browseByText: 'browse-by-text',
  helpWantedTitle: 'help-wanted-title',
  helpWantedDescription: 'help-wanted-desc',
  helpWantedButton: 'help-wanted-button',
  issueUrl: '/test-issue-url',
};

let wrapper;
let instance;
describe('components - HomeBanner', () => {
  beforeEach(() => {
    wrapper = shallow(<HomeBanner {...props} />);
    instance = wrapper.instance();
  });

  describe('componentDidMount', () => {
    it('should do nothing if `agencies` are passed', () => {
      expect(props.saveAgencies).not.toBeCalled();
    });

    it('should save the agencies if they do not exist', () => {
      wrapper.setProps({ agencies: undefined });
      instance.componentDidMount();
      expect(props.saveAgencies).toBeCalled();
    });
  });

  describe('scrollToAbout', () => {
    it('should scroll to the offset location', () => {
      // top - relies on fact that only single getElementById
      document.getElementById = () => ({ clientHeight: 100 });
      // offset - relies on fact that only single querySelector
      document.querySelector = () => ({ clientHeight: 25 });
      instance.scrollToAbout();
      expect(window.scrollTo).toBeCalledWith({ top: 75, behavior: 'smooth' });
    });
  });

  describe('agencyOptions', () => {
    it('should render options of agencies', () => {
      const options = shallow(<select>{instance.agencyOptions}</select>);
      expect(options.find('option').length).toBe(props.agencies.length);
    });

    it('should return nothing if no agencies provided', () => {
      wrapper.setProps({ agencies: undefined });
      const options = shallow(<select>{instance.agencyOptions}</select>);
      expect(options.find('option').length).toBe(0);
    });
  });

  describe('browseDropdown', () => {
    it('should render a select with options', () => {
      const dropdown = shallow(instance.browseDropdown);
      expect(dropdown.find('select').length).toBe(1);
      expect(dropdown.find('option').length).toBeGreaterThanOrEqual(props.agencies.length);
    });

    it('should render nothing if no agencies provided', () => {
      wrapper.setProps({ agencies: undefined });
      const dropdown = shallow(<span>{instance.browseDropdown}</span>);
      expect(dropdown.find('select').length).toBe(0);
    });
  });

  describe('verticalRow', () => {
    it('should render a div for styling', () => {
      const row = shallow(instance.verticalRow);
      expect(row.find('div').length).toBe(1);
    });

    it('should render nothing if `helpWantedTitle` and `helpWantedDescription` not provided', () => {
      wrapper.setProps({ helpWantedTitle: undefined, helpWantedDescription: undefined });
      const dropdown = shallow(<span>{instance.verticalRow}</span>);
      expect(dropdown.find('div').length).toBe(0);
    });
  });

  describe('helpWantedTitleSubsection', () => {
    it('should render the help wanted title', () => {
      const section = shallow(instance.helpWantedTitleSubsection);
      expect(section.find('div').text()).toBe(props.helpWantedTitle);
    });

    it('should render nothing if the `helpWantedTitle` is not provided', () => {
      wrapper.setProps({ helpWantedTitle: undefined });
      const section = shallow(<span>{instance.helpWantedTitleSubsection}</span>);
      expect(section.find('div').length).toBe(0);
    });
  });

  describe('helpWantedDescriptionSubsection', () => {
    it('should render the help wanted description', () => {
      const section = shallow(instance.helpWantedDescriptionSubsection);
      expect(section.find('div').text()).toBe(props.helpWantedDescription);
    });

    it('should render nothing if the `helpWantedDescription` is not provided', () => {
      wrapper.setProps({ helpWantedDescription: undefined });
      const section = shallow(<span>{instance.helpWantedDescriptionSubsection}</span>);
      expect(section.find('div').length).toBe(0);
    });
  });

  describe('helpWantedButtonSubsection', () => {
    it('should render the help wanted button', () => {
      const section = shallow(instance.helpWantedButtonSubsection);
      expect(section.find('button').text()).toBe(props.helpWantedButton);
    });

    it('should render nothing if the `helpWantedButton` is not provided', () => {
      wrapper.setProps({ helpWantedButton: undefined });
      const section = shallow(<span>{instance.helpWantedButtonSubsection}</span>);
      expect(section.find('button').length).toBe(0);
    });
  });

  describe('issueSection', () => {
    it('should render the issue section', () => {
      const section = shallow(instance.issueSection);
      expect(section.find({ href: props.issueUrl }).length).toBe(1);
    });

    it('should render nothing if the `issueUrl` is not provided', () => {
      wrapper.setProps({ issueUrl: undefined });
      const section = shallow(<span>{instance.issueSection}</span>);
      expect(section.find({ href: props.issueUrl }).length).toBe(0);
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});