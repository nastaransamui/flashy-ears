import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/src/redux/store";

const cardViewIcon = 'M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z'
const tableViewIcon = 'M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z'
export const Android12Switch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== "primary"
})(({ theme }) => {
  return {
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.primary.main
        )}" d="${cardViewIcon}"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.primary.main
        )}" d="${tableViewIcon}" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  };
});


export interface ViewTypeProps {

}

const ViewType: FC<ViewTypeProps> = ((props: ViewTypeProps) => {
  const { t } = useTranslation()
  const { cardView } = useSelector<State, State>(state => state)
  const dispatch = useDispatch();

  const cardViewsFunc = () => {
    dispatch({
      type: 'CARD_VIEW',
      payload: !cardView
    })
    localStorage.setItem('cardView', JSON.stringify(!cardView))
  }

  useEffect(() => {
    let isMount = true
    if (isMount) {
      dispatch({
        type: 'CARD_VIEW',
        payload: JSON.stringify(localStorage.getItem('cardView')) == `null`
          ? true
          : JSON.parse(localStorage.getItem('cardView')!)
      })
    }
    return () => {
      isMount = false;
    }
  }, [cardView])


  return (
    <Fragment>
      <Grid item>{t('tableview', { ns: 'common' })}</Grid>
      <Grid item>
        <Android12Switch
          color='primary'
          checked={cardView}
          onChange={() => {
            cardViewsFunc()
          }}
          value={t('tableview', { ns: 'common' })}
          inputProps={{ 'aria-label': 'checkbox' }}
        />
      </Grid>
      <Grid item>{t('cardview', { ns: 'common' })}</Grid>
    </Fragment>
  )
})

export default ViewType