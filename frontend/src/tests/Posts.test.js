import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Posts from '../components/Home/Content/Posts';

const post = {
  postid: '1',
  title: 'title',
  author: 'author',
  timestamp: 'timestamp',
  votes: 1,
  comments: 1,
};

it('renders correctly', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Posts {...post} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
