import { FC, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';

import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import Loading from '@/shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store';
import { useTranslation } from 'react-i18next';
import { getFirstRow } from 'apiCalls/getFirstRow';

var _ = require('lodash');


const cardStyles = makeStyles<{}>()((theme) => {
  return {
    card: {
      border: '0',
      marginBottom: '30px',
      marginTop: '30px',
      borderRadius: '6px',
      background: theme.palette.background.paper,
      width: '100%',
      boxShadow: theme.shadows[5],
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0',
      wordWrap: 'break-word',
      fontSize: '.875rem',
    },
    cardHeader: {
      padding: '0.75rem 1.25rem',
      marginBottom: '0',
      borderBottom: 'none',
      background: 'transparent',
      textAlign: 'right',
      minHeight: 110
    },
    cardHeaderStats: {
      '& $cardHeaderIcon': {
        textAlign: 'right',
      },
      '& h1,& h2,& h3,& h4,& h5,& h6': {
        margin: '0 !important',
      },
    },
    cardFooter: {
      padding: '0',
      paddingTop: '10px',
      margin: '0 15px 10px',
      borderRadius: '0',
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      backgroundColor: 'transparent',
      border: '0',
      color: theme.palette.text.color
    },
    cardFooterStats: {
      borderTop: `1px solid ${theme.palette.text.color} !important`,
      marginTop: '20px',
      '& svg': {
        position: 'relative',
        top: '4px',
        marginRight: '3px',
        marginLeft: '3px',
        width: '16px',
        height: '16px',
      },
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        position: 'relative',
        top: '4px',
        marginRight: '3px',
        marginLeft: '3px',
        fontSize: '16px',
        lineHeight: '16px',
      },
    },
    cardIconwarning: {
      borderRadius: 6,
      background:
        'linear-gradient(60deg, ' + theme.palette.warning.main + ', ' + theme.palette.warning.dark + ')',
      padding: 15,
      marginTop: -30,
      marginRight: 15,
      float: 'left',
    },
    cardIconinfo: {
      borderRadius: 6,
      background:
        'linear-gradient(60deg, #26c6da, #00acc1)',
      padding: 15,
      marginTop: -30,
      marginRight: 15,
      float: 'left',
    },
    cardIcondanger: {
      borderRadius: 6,
      background:
        'linear-gradient(60deg, #ef5350, #e53935)',
      padding: 15,
      marginTop: -30,
      marginRight: 15,
      float: 'left',
    },

    cardIcondark: {
      borderRadius: 6,
      background:
        'linear-gradient(60deg, #263238, #212121)',
      padding: 15,
      marginTop: -30,
      marginRight: 15,
      float: 'left',
    },
    cardCategory: {
      color: theme.palette.text.color,
      fontSize: 14,
      paddingTop: 10,
      marginBottom: 0,
      marginTop: 0,
      margin: 0,
    },
    cardTitle: {
      color: '#00acc1',
      textDecoration: 'none',
      fontWeight: '300',
      marginTop: '30px',
      marginBottom: '25px',
      minHeight: '32px',
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      '& small': {
        color: '#ffa726',
        fontSize: '65%',
        fontWeight: '400',
        lineHeight: '1',
      },
      '& a': {
        color: '#00acc1',
        textDecoration: 'none',
        fontWeight: '300',
        marginTop: '30px',
        marginBottom: '25px',
        minHeight: '32px',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        '& small': {
          color: '#ffa726',
          fontSize: '65%',
          fontWeight: '400',
          lineHeight: '1',
        },
      },
    },
    dangerText: {
      color: theme.palette.error.main + ' !important',
    },
    stats: {
      color: theme.palette.text.color,
      fontSize: '12px',
      lineHeight: '22px',
      display: 'inline-flex',
      '& svg': {
        position: 'relative',
        top: '4px',
        width: '16px',
        height: '16px',
        marginRight: '3px',
      },
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        position: 'relative',
        top: '4px',
        fontSize: '16px',
        marginRight: '3px',
      },
    },
    svg: {
      fontSize: '36px',
      lineHeight: '56px',
      textAlign: 'center',
      width: '36px',
      height: '36px',
      margin: '10px 10px 4px',
      fill: 'white'
    }
  }
})

export const tableValuesLocaleConvert = (value: string, rtlActive: boolean) => {

  if (rtlActive) {
    return value.replace(/[0-9]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 1728)
    );
  }
  return value;
};

const FirstRow: FC = (() => {
  const { classes, theme } = cardStyles({});
  const { firstRow, adminAccessToken } = useSelector<State, State>((state) => state);
  const { t, i18n } = useTranslation('common')
  const dispatch = useDispatch()

  const something = async () => {
    const firstRow = await getFirstRow(adminAccessToken)
    const { success, data } = firstRow;
    if (success) {
      dispatch({
        type: 'FIRST_ROW',
        payload: firstRow
      })
    }
  }

  useEffect(() => {
    if (firstRow.length == 0) {
      something()
    }
  }, [firstRow])

  return (
    <Grid container spacing={1}>
      {_.isEmpty(firstRow) ?
        <Grid item xs={12} sm={6} md={6} lg={12} >
          <Loading color={theme.palette.secondary.main} />
        </Grid> :
        <>
          {
            firstRow?.success ? Object.entries(firstRow?.data[0] as { key: string; value: { color: string, firstNumber: string, secondNumber: string; footer_icon: string; deactive: string; } }).map(([key, value], i) => {
              const color = value['color' as keyof typeof value];
              return (
                <Fragment key={i}>
                  <Grid item xs={12} sm={6} md={6} lg={12 / Object.keys(firstRow?.data[0]).length} >
                    <div style={{ minHeight: 110 }} className={classes.card}>
                      <div className={classes.cardHeaderStats + ' ' + classes.cardHeader} >
                        <div className={classes[`cardIcon${color}` as keyof typeof classes]}>
                          <SvgIcon className={classes.svg}>
                            <path d={`${value[`header_icon` as keyof typeof value]}`} />
                          </SvgIcon>
                        </div>
                        <p className={classes.cardCategory}>
                          {value[`title_${i18n.language}` as keyof typeof value]}
                        </p>
                        <h3 className={classes.cardTitle}>
                          {tableValuesLocaleConvert(
                            `${value[`firstNumber` as keyof typeof value]}`,
                            i18n.language !== 'fa' ? false : true
                          )}
                          {value['secondNumber' as keyof typeof value] !== '' && '/'}
                          {tableValuesLocaleConvert(
                            `${value['secondNumber' as keyof typeof value]}`,
                            i18n.language !== 'fa' ? false : true
                          )}{' '}
                        </h3>
                      </div>
                      <div className={classes.cardFooter + ' ' + classes.cardFooterStats}>
                        <div className={clsx(classes.stats, classes.dangerText)}>
                          <Icon>{value[`footer_icon` as keyof typeof value]}</Icon>
                          <a href='#pablo' onClick={(e) => e.preventDefault()}>
                            {value[`footer_${i18n.language}` as keyof typeof value]} &nbsp; {value['deactive' as keyof typeof value]}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Fragment>
              )
            })
              : <Grid item xs={12} sm={6} md={6} lg={12}>
                <div style={{
                  minHeight: 110,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: "center",
                  padding: 10,
                }} className={classes.card}>{t('firstRowError')}</div>
              </Grid>
          }
        </>
      }
    </Grid>
  )
});

export default FirstRow;