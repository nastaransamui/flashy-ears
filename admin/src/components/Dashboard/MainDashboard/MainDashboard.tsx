import { Button } from "@mui/material";
import { FC, Fragment } from "react";
import { CustomPropsTypes } from "../../Shared/interfaces/react.interface";
import maindashboardStyle from "./maindashboard-style";
import { useLocation, useNavigate } from "react-router-dom";


const MainDashboard: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { classes } = maindashboardStyle({})
  return (
    <Fragment>
      <div className={classes.MainDashboard}>
        MainDashboar page come here
        <Button onClick={() => { navigate("/user-page") }}>to user-page</Button>
        <Button onClick={() => { navigate("/user-page/user") }}>/user-page/user</Button>
      </div>
    </Fragment>
  )
}

export default MainDashboard

export const HelloH: FC<CustomPropsTypes> = (props: CustomPropsTypes) => {
  const navigate = useNavigate();
  const { state } = useLocation()
  return (
    <Fragment>
      HelloH:FC
      <Button onClick={() => { navigate("/") }}>to home</Button>
      <Button onClick={() => { navigate("/dashportpart") }}>to dashportpart</Button>
    </Fragment>
  )
}

