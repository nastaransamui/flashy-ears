
import { Fragment, useEffect, useState } from 'react'
//Theme
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ChildrenProps } from '@/interfaces/react.interface'

import LoadingBar from 'react-top-loading-bar';
// import { CustomToaster } from '@/src/components/Shared/CustomToaster/CustomToaster'

import CircleToBlockLoading from 'react-loadingg/lib/CircleToBlockLoading';
import Backdrop from '@mui/material/Backdrop';

import { StylesProvider } from '@mui/styles';

import useWrapper from './useAppWrapper';

const AppWrapper = ({ children }: ChildrenProps) => {
  const [percent, setPercent] = useState<number>(50)
  const [showLoading, setShowLoading] = useState<boolean>(true)

  const { homeTheme,
    jss,
    homeFormSubmit,
    homeLoadingBar,
    homeThemeType
  } = useWrapper();

  useEffect(() => {
    const interval = setInterval(() => {
      if (percent < 100) {
        setPercent(() => percent + 1)
      } else {
        setShowLoading(false)
      }
    }, 15);
    return () => {
      clearInterval(interval);
    };
  }, [percent, showLoading]);

  return (
    <Fragment >
      <ThemeProvider theme={homeTheme}>
        <CssBaseline />
        <StylesProvider jss={jss}>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={homeFormSubmit}
          // onClick={() => { console.log('somehing') }}
          >
            <CircleToBlockLoading color={homeTheme.palette.primary.main} />
          </Backdrop>

          {/* <CustomToaster /> */}
          <LoadingBar
            height={5}
            shadow
            color={homeThemeType == 'dark' ? homeTheme.palette.secondary.main : homeTheme.palette.primary.main}
            progress={homeLoadingBar}
            className='top-loading-bar'
            data-testid="loadingBar"
          />
          <>
            {
              showLoading ?
                <div className="flexy-column" >
                  <div className="progress-factor flexy-item" >
                    <div className="progress-bar" style={{ position: 'absolute', top: '50%', right: 3 }}>
                      <div className="bar has-rotation has-colors dark dots-pattern" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                        <div className="tooltip"></div>
                        <div className="bar-face face-position roof percentage"></div>
                        <div className="bar-face face-position back percentage"></div>
                        <div className="bar-face face-position floor percentage volume-lights"></div>
                        <div className="bar-face face-position left"></div>
                        <div className="bar-face face-position right"></div>
                        <div className="bar-face face-position front percentage volume-lights shine"></div>
                      </div>
                    </div>
                  </div>
                </div>
                : <>{children}</>
            }
          </>
        </StylesProvider>
      </ThemeProvider>
    </Fragment>
  )
}

export default AppWrapper;