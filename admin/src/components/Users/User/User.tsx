
import { FC } from "react";

import { useLocation } from "react-router-dom";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';

//Components
import BackButton from '@/shared/BackButton';
import EditUser from './EditUser';
import CreateUser from "./CreateUser";

interface UserTypes { }
const User: FC<UserTypes> = ((props: UserTypes) => {
  const { search } = useLocation()
  const currentRouteState = useCurrentRouteState();

  return (
    <div style={{ marginTop: 80, wordBreak: 'break-word' }}>
      <BackButton pushUrl='/users-page' />
      <br />
      {
        search == '' ? <CreateUser /> : <EditUser />
      }

    </div>
  )
})

export default User;