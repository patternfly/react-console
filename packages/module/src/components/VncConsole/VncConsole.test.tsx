import { render } from '@testing-library/react';
import { VncConsole } from './VncConsole';

test('placeholder render test', () => {
  const { asFragment } = render(<VncConsole host="my.unknown.host" />);
  expect(asFragment()).toMatchSnapshot();
});
