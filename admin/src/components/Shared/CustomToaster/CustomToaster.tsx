import { Fragment, useState, forwardRef } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import useStyles from './custom-toaster-style';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';


interface Props {
  children: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ToastMessage: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('common')
  return (
    <Fragment>
      <Dialog
        open={open}
        scroll='paper'
        onBackdropClick={() => {
          setOpen((prevState: boolean) => !prevState)
        }}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        TransitionComponent={Transition}>
        <DialogTitle
          id='scroll-dialog-title'
          sx={{ padding: 1, minHeight: 30 }}>
          <IconButton
            style={{ right: '12px', top: 0, position: 'absolute' }}
            onClick={() => setOpen((prevState: boolean) => !prevState)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 1, minHeight: 30 }}></DialogActions>
      </Dialog>
      <div>
        {`${children.slice(0, 85)}`}{' '}
        {children.length >= 85 ? (
          <Button
            color='primary'
            onClick={() => {
              setOpen((prevState: boolean) => !prevState);
            }}>
            {open ? t('...less') : t('...more')}
          </Button>
        ) : null}{' '}
      </div>
    </Fragment>
  )
}

ToastMessage.propTypes = {
  children: PropTypes.string.isRequired
}


export const CustomToaster = () => {
  const { classes } = useStyles({})
  const { i18n } = useTranslation();
  const rtlActive = i18n.language == 'fa';
  return (
    <Fragment>
      <ToastContainer limit={1} position="bottom-left"
        autoClose={5000}
        transition={Zoom}
        closeOnClick={false}
        toastClassName={classes.toastBody}
        progressClassName={classes.toastProgress}
        draggableDirection="y"
        draggablePercent={100}
        theme='dark' rtl={rtlActive} />
    </Fragment>
  )
}
