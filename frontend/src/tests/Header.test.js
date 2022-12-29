import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../contexts/AppProvider';
import Header from '../components/Header/Header';

const initialState = {
  userId: '1',
  username: 'user',
  token: 'token',
};

it('renders correctly', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders logo text', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree.children[0].children[0]).toBe('not-reddit');
});

it('renders log in and sign up links when not logged in', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AppProvider>
        <Header />
      </AppProvider>
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree.children[1].children[0]).toBe('log in');
  expect(tree.children[2].children[0]).toBe('sign up');
});

it('renders username, create post, and logout links when logged in', () => {
  const component = renderer.create(
    <MemoryRouter>
      <AppProvider value={initialState}>
        <Header />
      </AppProvider>
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree.children[1].children[0]).toBe('user');
  expect(tree.children[2].children[0]).toBe('create post');
  expect(tree.children[3].children[0]).toBe('logout');
});
