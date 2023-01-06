import renderer from 'react-test-renderer';
import Content from '../components/Home/Content/Content';

it('renders correctly', () => {
  const tree = renderer.create(<Content />).toJSON();
  expect(tree).toMatchSnapshot();
});
