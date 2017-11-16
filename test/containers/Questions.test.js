import { Questions } from '../../src/containers/Questions';
import Sidebar from '../../src/components/Sidebar';
import QuestionMain from '../../src/components/QuestionMain';

const spy = sinon.spy(Questions.prototype, 'componentWillReceiveProps');

describe('Questions Container', () => {

    it('Renders the 2 child components when loading is false', () => {
        const result = {
            loading: false,
            faqs: [
            {
                "title": "Title 1",
                "body": "Body 1"
            },
            {
                "title": "Title 2",
                "body": "Body 2"
            },
            {
                "title": "Title 3",
                "body": "Body 3"
            }]
        };

        const wrapper = shallow(<Questions data={result} />);
        expect(wrapper.contains(<Sidebar faqs={result.faqs} loading={result.loading} />)).to.equal(true);
        expect(wrapper.contains(<QuestionMain faqs={result.faqs} loading={result.loading} />)).to.equal(true);
    });

    it('Renders the 2 child components when loading is true', () => {
        const result = {
            loading: true,
            faqs: [
                {
                    "title": "Title 1",
                    "body": "Body 1"
                },
                {
                    "title": "Title 2",
                    "body": "Body 2"
                },
                {
                    "title": "Title 3",
                    "body": "Body 3"
                }]
        };

        const wrapper = shallow(<Questions data={result} />);
        expect(wrapper.contains(<Sidebar faqs={[]} loading={result.loading} />)).to.equal(true);
        expect(wrapper.contains(<QuestionMain faqs={[]} loading={result.loading} />)).to.equal(true);
    });
});