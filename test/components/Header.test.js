import Header from '../../src/components/Header';

describe('Header Component', () => {

    it('Renders 2 NavLink items', () => {
        const wrapper = shallow(<Header location={{ pathname: '' }} />);
        expect(wrapper.find('.nav.navbar-nav li').length).to.equal(2);
    });
});