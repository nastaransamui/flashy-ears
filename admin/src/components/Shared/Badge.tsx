import { FC, ReactNode } from 'react';
import MuiBadge from '@mui/material/Badge';

export interface BadgeType {
  children: ReactNode;
  color: 'primary' | 'secondary' | 'error';
}
const Badge: FC<BadgeType> = (({ children, color }) => {

  return (
    <MuiBadge color={color} variant="dot"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }} >
      {children}
    </MuiBadge>
  )
})

export default Badge;