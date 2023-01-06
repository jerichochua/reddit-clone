import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../contexts/AppProvider';
import Post from '../components/Post/Post';

it('renders correctly', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AppProvider>
        <Post />
      </AppProvider>
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
