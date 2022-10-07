import { Button } from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { CustomPropsTypes } from "../../Shared/interfaces/react.interface";
import maindashboardStyle from "./maindashboard-style";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";

import { db } from '@/src/browserDb';
import { useLiveQuery } from "dexie-react-hooks";

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const MainDashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { propsMiniActive } = useSelector<State, State>(state => state)
  const { classes, cx } = maindashboardStyle({})
  const items = useLiveQuery(() => db.routesDb.toArray()) || [];
  console.log(items)
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
        <Button onClick={() => { navigate("/dashportpart") }}>to dashportpart</Button>
      </div>
    </Fragment>
  )
}

export const UserList: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
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
        UserList
        {JSON.stringify(state)}
        <Button onClick={() => { navigate("/") }}>to home</Button>
        <Button onClick={() => { navigate("/dashportpart") }}>to dashportpart</Button>
      </div>
    </Fragment>
  )
}