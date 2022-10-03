import { makeStyles } from "tss-react/mui";

const maindashboardStyle = makeStyles<{}>()((theme) => {
  return {
    MainDashboard: {
      flex: 4,
      padding: 10,
      color: theme.palette.text.color,
    },
  }
})

export default maindashboardStyle;