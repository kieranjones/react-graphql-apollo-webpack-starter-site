import { Home } from '../../src/containers/Home';

const spy = sinon.spy(Home.prototype, 'componentWillReceiveProps');

describe('Home Container', () => {

    it('Renders the correct data to the page', () => {
        const result = {
            homepage: {
                "heading": "Heading",
                "subheading": "Subheading"
            }
        };

        const wrapper = shallow(<Home data={result} />);
        expect(wrapper.contains(<h1>Heading</h1>)).to.equal(true);
    });
});