import renderer from 'react-test-renderer';
import { AppProvider } from '../contexts/AppProvider';
import CreatePost from '../components/CreatePost/CreatePost';

it('renders correctly', () => {
  const tree = renderer.create(
    <AppProvider>
      <CreatePost />
    </AppProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
