import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavItem from './NavItem';

configure({ adapter: new Adapter() });

describe('<NavItems />', () => {
  it('should render 2 <NavItem /> elements if not authenticated', () => {
    const wrapper = shallow(<NavItems />);
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
});