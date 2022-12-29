import renderer from 'react-test-renderer';
import { AppProvider } from '../contexts/AppProvider';
import LoginForm from '../components/Login/LoginForm';

it('renders correctly', () => {
  const component = renderer.create(
    <AppProvider>
      <LoginForm />
    </AppProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
