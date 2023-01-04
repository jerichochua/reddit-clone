import renderer from 'react-test-renderer';
import Votes from '../components/Vote/Votes';

it('renders correctly', () => {
  const component = renderer.create(<Votes />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with score', () => {
  const component = renderer.create(<Votes score={1} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with upvote and downvote buttons', () => {
  const component = renderer.create(<Votes score={1} />);
  const tree = component.toJSON();
  expect(tree.children[0].props.className).toBe('upvote-btn');
  expect(tree.children[2].props.className).toBe('downvote-btn');
});
