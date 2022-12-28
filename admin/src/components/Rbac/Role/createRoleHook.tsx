import { useEffect, useState } from 'react';
import Home from '@mui/icons-material/Home';
import useRoutesUpdate from '@/hookes/useRoutesUpdate';

const createRoleHook = () => {
  const updateRoutes = useRoutesUpdate();
  const [values, setValues] = useState([
    {
      roleName: '',
      isActive: true,
      //@ts-ignore
      icon: Home[`type` as keyof typeof Home].render().props.children.props.d,
      remark: ''
    },
    {
      routes: updateRoutes,
    },
    {
      usersData: []
    }
  ]);

  return {
    values
  }
}

export default createRoleHook;