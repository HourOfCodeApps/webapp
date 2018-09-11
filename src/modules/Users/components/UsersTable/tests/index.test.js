import { mount } from 'enzyme';
import componentSetup from 'shared/utils/testing/componentSetup';

import UsersTableRow from '../../UsersTableRow';
import UsersTable from '..';

import { users } from '../../../tests/mocks';

const setup = componentSetup(UsersTable, {
  users: [],
});


describe('Users - <UsersTable />', () => {
  it('empty', () => {
    const component = setup({ users: [] }, mount);
    expect(component.find(UsersTableRow)).toHaveLength(0);
  });

  it('users', () => {
    const component = setup({ users }, mount);
    expect(component.find(UsersTableRow)).toHaveLength(users.length);
  });
});
