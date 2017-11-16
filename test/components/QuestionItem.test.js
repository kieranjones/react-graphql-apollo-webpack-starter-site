import QuestionItem from '../../src/components/QuestionItem';

it('should render QuestionItem component correctly', () => {

    const question = {
        "title": "Question title",
        "body": "Body text sample"
    };
    const wrapper = shallow(
        <QuestionItem question={question} />
    );
    expect(wrapper.contains(<h3>Question title</h3>)).to.equal(true);
});