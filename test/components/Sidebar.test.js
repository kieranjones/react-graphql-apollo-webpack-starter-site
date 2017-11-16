import Sidebar from '../../src/components/Sidebar';

const faqs = [{
    "title": "Question 1 title",
    "body": "Body text sample"
}, {
    "title": "Question 2 title",
    "body": "Body text sample"
}];

describe('Sidebar component', () => {
    it('should render component if it has data and is not loading', () => {

        const wrapper = shallow(
            <Sidebar faqs={faqs} loading={false}/>
        );
        expect(wrapper.contains(<span className="sidebar__container--title-heading">What would you like to know?</span>)).to.equal(true);
        expect(wrapper.contains(<li>Loading...</li>)).equal(false);
    });

    it('should render component if it has data and is loading', () => {

        const wrapper = shallow(
            <Sidebar faqs={faqs} loading={true}/>
        );
        expect(wrapper.contains(<li>Loading...</li>)).equal(true);
    });

    it('should render component if it has empty data and is loading', () => {

        const wrapper = shallow(
            <Sidebar faqs={[]} loading={true}/>
        );
        expect(wrapper.contains(<li>Loading...</li>)).equal(true);
    });
});