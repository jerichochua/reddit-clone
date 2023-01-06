import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Comment from '../components/Post/Comment';

const comment = {
  id: 1,
  author: 'test',
  content: 'test',
  created_at: '2020-01-01T00:00:00.000Z',
};

jest.mock('../util/getRelativeTime', () => () => 'timestamp');

it('renders correctly', () => {
  const tree = renderer
    .create(<Comment comment={comment} username='test' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('opens edit form when edit button is clicked', () => {
  const tree = renderer.create(<Comment comment={comment} username='test' />);
  act(() => {
    tree.root.findByProps({ label: 'Edit' }).props.onClick();
  });
  expect(tree.toJSON()).toMatchSnapshot();
});

it('closes edit form when cancel button is clicked', () => {
  const tree = renderer.create(<Comment comment={comment} username='test' />);
  act(() => {
    tree.root.findByProps({ label: 'Edit' }).props.onClick();
  });
  act(() => {
    tree.root.findByProps({ label: 'Cancel' }).props.onClick();
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
