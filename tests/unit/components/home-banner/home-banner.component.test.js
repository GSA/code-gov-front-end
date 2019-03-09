import React from 'react';
import { shallow } from 'enzyme';

import { testRenderText, testRenderList, testRenderEmpty } from 'testUtils/render';
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
      testRenderList(instance.agencyOptions, 'option', props.agencies.length);
    });

    it('should return nothing if no agencies provided', () => {
      wrapper.setProps({ agencies: undefined });
      testRenderEmpty(instance.agencyOptions, 'option', 0);
    });
  });

  describe('browseDropdown', () => {
    it('should render a select with options', () => {
      // + 2 for 'all' and 'browseByText'
      testRenderList(instance.browseDropdown, 'option', props.agencies.length + 2);
    });

    it('should render nothing if no agencies provided', () => {
      wrapper.setProps({ agencies: undefined });
      testRenderEmpty(instance.browseDropdown);
    });
  });

  describe('verticalRow', () => {
    it('should render the `vertical-row` class for styling', () => {
      testRenderList(instance.verticalRow, '.vertical-row', 1);
    });

    it('should render nothing if `helpWantedTitle` and `helpWantedDescription` not provided', () => {
      wrapper.setProps({ helpWantedTitle: undefined, helpWantedDescription: undefined });
      testRenderEmpty(instance.verticalRow);
    });
  });

  describe('helpWantedTitleSubsection', () => {
    it('should render the help wanted title', () => {
      testRenderText(instance.helpWantedTitleSubsection, props.helpWantedTitle);
    });

    it('should render nothing if the `helpWantedTitle` is not provided', () => {
      wrapper.setProps({ helpWantedTitle: undefined });
      testRenderEmpty(instance.helpWantedTitleSubsection);
    });
  });

  describe('helpWantedDescriptionSubsection', () => {
    it('should render the help wanted description', () => {
      testRenderText(instance.helpWantedDescriptionSubsection, props.helpWantedDescription);
    });

    it('should render nothing if the `helpWantedDescription` is not provided', () => {
      wrapper.setProps({ helpWantedDescription: undefined });
      testRenderEmpty(instance.helpWantedDescriptionSubsection);
    });
  });

  describe('helpWantedButtonSubsection', () => {
    it('should render the help wanted button', () => {
      const section = shallow(instance.helpWantedButtonSubsection);
      expect(section.find('button').text()).toBe(props.helpWantedButton);
    });

    it('should render nothing if the `helpWantedButton` is not provided', () => {
      wrapper.setProps({ helpWantedButton: undefined });
      testRenderEmpty(instance.helpWantedButtonSubsection);
    });
  });

  describe('issueSection', () => {
    it('should render the issue section', () => {
      const section = shallow(instance.issueSection);
      expect(section.find({ href: props.issueUrl }).length).toBe(1);
    });

    it('should render nothing if the `issueUrl` is not provided', () => {
      wrapper.setProps({ issueUrl: undefined });
      testRenderEmpty(instance.issueSection);
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});