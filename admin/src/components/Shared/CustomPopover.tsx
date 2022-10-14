import PropTypes from 'prop-types'
import Popover from '@mui/material/Popover'
import { FC, ReactNode } from 'react'

interface CustomPopoverTypes {
  children: ReactNode;
  id: string | undefined;
  setAnchor: Function;
  open: boolean;
  anchor: HTMLButtonElement | null;
}

const CustomPopover: FC<CustomPopoverTypes> = (props: CustomPopoverTypes) => {
  const { children, id, setAnchor, open, anchor } = props;
  return (
    <Popover
      elevation={18}
      disableScrollLock
      id={id}
      open={open}
      anchorEl={anchor}
      onClose={() => {
        setAnchor(null);
      }}
      sx={
        {
          top: { xl: 36, lg: 32, md: 32, sm: 13, xs: 13 },
        }
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      {children}
    </Popover>
  )
}

CustomPopover.defaultProps = {
  id: 'test',
  anchor: null
}


CustomPopover.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  setAnchor: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.instanceOf(HTMLButtonElement)
}

export default CustomPopover;