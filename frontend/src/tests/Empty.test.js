import renderer from 'react-test-renderer';
import Empty from '../components/Empty/Empty';

it('renders correctly with message', () => {
  const component = renderer.create(<Empty message='test message' />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
