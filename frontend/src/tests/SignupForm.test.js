import renderer from 'react-test-renderer';
import { AppProvider } from '../contexts/AppProvider';
import SignupForm from '../components/Signup/SignupForm';

it('renders correctly', () => {
  const component = renderer.create(
    <AppProvider>
      <SignupForm />
    </AppProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
