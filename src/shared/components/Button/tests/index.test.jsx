import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

test('Button', () => {
  const button = shallow(<Button>Hello</Button>);

  expect(button.text()).toEqual('Hello');
});
