import { makeStyles } from "tss-react/mui";
import {
  drawerWidth,
  drawerMiniWidth
} from '@/theme/common'

const maindashboardStyle = makeStyles<{}>()((theme) => {
  return {
    MainDashboard: {
      // width: `calc(100% - ${drawerMiniWidth}px)`,
      // flex: 4,
      marginTop: 85,
      marginLeft: theme.direction == 'ltr' ? -20 : 15,
      marginRight: theme.direction == 'ltr' ? 15 : -20,
      [theme.breakpoints.down('sm')]: {
        marginRight: 15,
        marginLeft: 0
      }
    },
    sidebarHandlemainOpen: {
      transition: 'all .35s ease',
    },
    sidebarHandlemainClose: {
      transition: 'all .35s ease',
    },
  }
})

export default maindashboardStyle;