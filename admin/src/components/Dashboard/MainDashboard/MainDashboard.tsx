import { Button } from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { CustomPropsTypes } from "../../Shared/interfaces/react.interface";
import maindashboardStyle from "./maindashboard-style";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const MainDashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { propsMiniActive } = props;
  const { classes, cx } = maindashboardStyle({})
  return (
    <Fragment>
      <div className={classes.MainDashboard + " " + cx({
        [classes.sidebarHandlemainOpen]: propsMiniActive,
        [classes.sidebarHandlemainClose]: !propsMiniActive,
      })}>
        MainDashboar page come here
        <Button onClick={() => { navigate("/user-page") }}>to user-page</Button>
        <Button onClick={() => { navigate("/user-page/user") }}>/user-page/user</Button>
      </div>
    </Fragment>
  )
}

export default MainDashboard

export const OneUser: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { state } = useLocation()
  const location = useLocation()
  const { propsMiniActive } = props;
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
        <Button onClick={() => { navigate("/dashportpart") }}>to dashportpart</Button>
      </div>
    </Fragment>
  )
}

export const UserList: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { state } = useLocation()
  const location = useLocation()
  const { propsMiniActive } = props;
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
        UserList
        {JSON.stringify(state)}
        <Button onClick={() => { navigate("/") }}>to home</Button>
        <Button onClick={() => { navigate("/dashportpart") }}>to dashportpart</Button>
      </div>
    </Fragment>
  )
}