import React from 'react';
import { mount } from 'enzyme';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

import UsersTable from '..';

import { users } from '../../../tests/mocks';

describe('Users - <UsersTable />', () => {
  it('empty', () => {
    const component = mount(<UsersTable users={[]} />);
    expect(component.find(TableBody).find(TableRow)).toHaveLength(0);
  });

  it('users', () => {
    const component = mount(<UsersTable users={users} />);
    expect(component.find(TableBody).find(TableRow)).toHaveLength(users.length);
  });
});
