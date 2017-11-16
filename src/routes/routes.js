import Home from '../containers/Home';
import Questions from '../containers/Questions';

export default [
	{
		path: '/',
		exact: true,
		main: Home
	},
	{
		path: '/faqs',
		main: Questions
	}
];
