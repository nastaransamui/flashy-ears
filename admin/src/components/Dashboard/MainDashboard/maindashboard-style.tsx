import { makeStyles } from "tss-react/mui";
import {
  drawerWidth,
  drawerMiniWidth
} from '@/theme/common'

const maindashboardStyle = makeStyles<{}>()((theme) => {
  return {
    MainDashboard: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
      // flex: 4,
      marginTop: 85,
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