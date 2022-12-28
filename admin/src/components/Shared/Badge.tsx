import { FC, ReactNode } from 'react';
import MuiBadge from '@mui/material/Badge';
import { useTranslation } from 'react-i18next';

export interface BadgeType {
  children: ReactNode;
  color: 'primary' | 'secondary' | 'error';
}
const Badge: FC<BadgeType> = (({ children, color }) => {
  const { i18n } = useTranslation('common');
  const rtlActive = i18n.language == 'fa';

  return (
    <MuiBadge color={color} variant="dot"
      anchorOrigin={{
        vertical: 'top',
        horizontal: rtlActive ? 'right' : 'left',
      }} >
      {children}
    </MuiBadge>
  )
})

export default Badge;