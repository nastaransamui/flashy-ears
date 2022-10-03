import { FC, createRef } from "react";
import { ProDashboardProps } from "@/interfaces/react.interface";
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import brand from '@/public/text/brand'
import PropTypes from 'prop-types'


const NavbarMain: FC<ProDashboardProps> = (props: ProDashboardProps) => {
  const { sidebarMinimizeFunc, rtlActive } = props;
  return (
    <div style={{ marginLeft: 300 }}>
      <Button onClick={() => { sidebarMinimizeFunc() }}>Sidebar</Button>
    </div>
  )
}
export default NavbarMain;