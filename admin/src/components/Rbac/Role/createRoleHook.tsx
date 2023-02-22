import { useEffect, useState } from 'react';
import Home from '@mui/icons-material/Home';
import useRoutesUpdate from '@/hookes/useRoutesUpdate';
import { useForm } from "react-hook-form";
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

  const { handleSubmit, watch, control, register, formState: { errors }, resetField, setError, clearErrors, trigger } = useForm<any>();
  const formTrigger = async () => { }
  const onSubmit = (data: any) => console.log(data)

  return {
    values,
    handleSubmit,
    formTrigger,
    onSubmit
  }
}

export default createRoleHook;