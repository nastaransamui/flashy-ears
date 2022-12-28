
import { FC } from "react";

import { useLocation } from "react-router-dom";


//Components
import BackButton from '@/shared/BackButton';
import EditRole from './EditRole';
import CreateRole from "./CreateRole";

interface UserTypes { }
const Role: FC<UserTypes> = ((props: UserTypes) => {
  const { search } = useLocation()

  return (
    <div style={{ marginTop: 100, wordBreak: 'break-word' }}>
      <BackButton pushUrl='/rbacs-data' />
      <br />
      {
        search == '' ? <CreateRole /> : <EditRole />
      }

    </div>
  )
})

export default Role;