import renderer from 'react-test-renderer';
import PostDetails from '../components/Post/PostDetails';
import { AppProvider } from '../contexts/AppProvider';

const post = {
  author: 'test',
  title: 'test',
  content: 'test',
  score: 1,
  comments: 1,
  created_at: '2020-01-01T00:00:00.000Z',
};

it('renders correctly', () => {
  const tree = renderer.create(
    <AppProvider>
      <PostDetails post={post} />
    </AppProvider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly with delete button', () => {
  const tree = renderer.create(
    <AppProvider value={{ username: 'test' }}>
      <PostDetails post={post} />
    </AppProvider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
  expect(tree.root.findByProps({ label: 'Delete' })).toBeTruthy();
});

it('calls onDelete when delete button is clicked', () => {
  const onDelete = jest.fn();
  const tree = renderer.create(
    <AppProvider value={{ username: 'test' }}>
      <PostDetails post={post} onDelete={onDelete} />
    </AppProvider>
  );
  tree.root.findByProps({ label: 'Delete' }).props.onClick();
  expect(onDelete).toHaveBeenCalled();
});
