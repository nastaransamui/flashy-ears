
import { Fragment, } from 'react'
//Theme
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ChildrenProps } from '@/interfaces/react.interface'

import LoadingBar from 'react-top-loading-bar';
import { CustomToaster } from '@/src/components/Shared/CustomToaster/CustomToaster'

import CircleToBlockLoading from 'react-loadingg/lib/CircleToBlockLoading';
import Backdrop from '@mui/material/Backdrop';
import { StylesProvider } from '@mui/styles';

import useWrapper from './useAppWrapper';

const AppWrapper = ({ children }: ChildrenProps) => {

  const { adminTheme,
    jss,
    adminFormSubmit,
    adminLoadingBar, } = useWrapper()
  return (
    <Fragment >
      <ThemeProvider theme={adminTheme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <StylesProvider jss={jss}>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={adminFormSubmit}
          // onClick={() => { console.log('somehing') }}
          >
            <CircleToBlockLoading color={adminTheme.palette.primary.main} />
          </Backdrop>

          <CustomToaster />
          <LoadingBar
            height={5}
            shadow
            color={adminTheme.palette.secondary.main}
            progress={adminLoadingBar}
            className='top-loading-bar'
            data-testid="loadingBar"
          />
          {children}
        </StylesProvider>
      </ThemeProvider>
    </Fragment>
  )
}

export default AppWrapper;