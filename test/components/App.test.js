import { App } from '../../src/components/App';
import Header from '../../src/components/Header';

describe('App Component', () => {

    it('Renders the Header component', () => {
        const wrapper = shallow(<App location={{ pathname: '/' }} />);
        expect(wrapper.contains(<Header location={{ pathname: '/' }} />)).to.equal(true);
    });
});