import componentSetup from 'shared/utils/testing/componentSetup';

import { UsersComponent as Users } from '../container';

const setup = componentSetup(Users, {
  onFetchUsers() {},
  users: [],
  usersFetching: false,
  usersFetchingError: null,
});

describe('Users - <Container />', () => {
  it('should call onFetchUsers method', () => {
    const onFetchUsers = jest.fn();
    const component = setup({ onFetchUsers });
    component.instance().componentDidMount();
    expect(onFetchUsers).toHaveBeenCalled();
  });
});
