import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('NavigationItems', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('Should render 2 navigation items if is not auth-ed', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should render 3 navigation items if is auth-ed', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Should contain logout <NavigationItem />', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });

    it('Should contain orders <NavigationItem />', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)).toEqual(true);
    });
});
