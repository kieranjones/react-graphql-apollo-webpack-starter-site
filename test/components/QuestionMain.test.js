import QuestionMain from '../../src/components/QuestionMain';

const faqs = [{
    "title": "Question 1 title",
    "body": "Body text sample"
}, {
    "title": "Question 2 title",
    "body": "Body text sample"
}];

describe('QuestionMain component', () => {
    it('should render component if it has data and is not loading', () => {

        const wrapper = shallow(
            <QuestionMain faqs={faqs} loading={false}/>
        );
        expect(wrapper.contains(<h1>Frequently Asked Questions</h1>)).to.equal(true);
        expect(wrapper.contains(<div>Loading...</div>)).equal(false);
    });

    it('should render component if it has data and is loading', () => {

        const wrapper = shallow(
            <QuestionMain faqs={faqs} loading={true}/>
        );
        expect(wrapper.contains(<div>Loading...</div>)).equal(true);
    });

    it('should render component if it has empty data and is loading', () => {

        const wrapper = shallow(
            <QuestionMain faqs={[]} loading={true}/>
        );
        expect(wrapper.contains(<div>Loading...</div>)).equal(true);
    });
});
