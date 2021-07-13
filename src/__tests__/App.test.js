import { mount, shallow } from 'enzyme';
import App from '../App';

test('renders learn react link', () => {
  const app = shallow(<App />);
  expect(app.length).toEqual(1);
});
