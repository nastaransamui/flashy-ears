import { Button } from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { CustomPropsTypes } from "../../Shared/interfaces/react.interface";
import maindashboardStyle from "./maindashboard-style";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";


export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const MainDashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { propsMiniActive } = useSelector<State, State>(state => state)
  const { classes, cx } = maindashboardStyle({})
  return (
    <Fragment>
      <div className={classes.MainDashboard + " " + cx({
        [classes.sidebarHandlemainOpen]: propsMiniActive,
        [classes.sidebarHandlemainClose]: !propsMiniActive,
      })}>
        MainDashboar page come here
        <Button onClick={() => { navigate("/users-page") }}>to users-page</Button>
        <Button onClick={() => { navigate("/rbacs-data") }}>/rbacs-data</Button>
      </div>
    </Fragment>
  )
}

export default MainDashboard

export const OneUser: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { state } = useLocation()
  const location = useLocation()
  const { propsMiniActive } = useSelector<State, State>(state => state)
  const { classes, cx } = maindashboardStyle({})
  let query = useQuery();
  let { search } = location;
  // console.log(search !== '' ? query.get('_id') : 'hichi')
  return (
    <Fragment>
      <div className={classes.MainDashboard + " " + cx({
        [classes.sidebarHandlemainOpen]: propsMiniActive,
        [classes.sidebarHandlemainClose]: !propsMiniActive,
      })}>
        OneUser
        {JSON.stringify(state)}
        <Button onClick={() => { navigate("/") }}>to home</Button>
        <Button onClick={() => { navigate("/rbac-data/role?_id=633fba02257b4d6c736d1623") }}>to /rbac-data/role?_id=633fba02257b4d6c736d1623</Button>
      </div>
    </Fragment>
  )
}
import DataShow from '@/src/components/Shared/DataShow/DataShow';
export const UserList: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { state } = useLocation()
  const location = useLocation()
  const { propsMiniActive } = useSelector<State, State>(state => state)
  const { classes, cx } = maindashboardStyle({})

  return (
    <Fragment>
      <div className={classes.MainDashboard + " " + cx({
        [classes.sidebarHandlemainOpen]: propsMiniActive,
        [classes.sidebarHandlemainClose]: !propsMiniActive,
      })}>
        UserList
        <Button onClick={() => { navigate("/") }}>to home</Button>
        <DataShow />
      </div>
    </Fragment>
  )
}