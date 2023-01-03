import renderer from 'react-test-renderer';
import { AppProvider } from '../contexts/AppProvider';
import CommentForm from '../components/Post/CommentForm';

it('renders correctly', () => {
  const component = renderer.create(
    <AppProvider>
      <CommentForm postId={1} />
    </AppProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
