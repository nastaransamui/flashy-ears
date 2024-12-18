import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import useMediaQuery from '@mui/material/useMediaQuery'

import PropTypes from 'prop-types';

import userSideBarStyle from './user-sidebar-style'
import { useSelector } from 'react-redux'
import { Profile, State } from '@/src/redux/store'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { FC } from 'react'
import { SibebarUserProps } from '../../Shared/interfaces/react.interface'
import { useTranslation } from 'react-i18next'
import { useQuery } from "@/src/components/Dashboard/ReactRouter";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';

const SidebarUser: FC<SibebarUserProps> = (props: SibebarUserProps) => {
  const { classes, cx, theme } = userSideBarStyle({})
  const { t } = useTranslation('dashboard')
  const navigate = useNavigate();
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  let query = useQuery();
  const _id = query.get('_id');
  const profile = useSelector<State, Profile>(state => state.profile)
  const propsMiniActive = useSelector<State, boolean>((state) => state.propsMiniActive);
  const { sideBarbgColor, rtlActive, openCollapse, stateMiniActive, openAvatar } = props;
  const userWrapperClass =
    classes.user
    +
    ' ' +
    cx({
      [classes.whiteAfter]: sideBarbgColor === 'white',
      [classes.blackAfter]: sideBarbgColor === 'black',
    });


  const photo =
    classes.photo +
    ' ' +
    cx({
      [classes.photoRTL]: rtlActive,
    });

  const caret =
    classes.caret +
    ' ' +
    cx({
      [classes.caretRTL]: rtlActive,
    });

  const itemText =
    classes.itemText +
    ' ' +
    cx({
      [classes.itemTextMini]: !propsMiniActive && stateMiniActive,
      [classes.itemTextMiniRTL]:
        rtlActive && !propsMiniActive && stateMiniActive,
      [classes.itemTextRTL]: rtlActive,
    });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const collapseItemMini =
    classes.collapseItemMini +
    ' ' +
    cx({
      [classes.collapseItemMiniRTL]: rtlActive,
    });

  const collapseItemText =
    classes.collapseItemText +
    ' ' +
    cx({
      [classes.collapseItemTextMini]: !propsMiniActive && stateMiniActive,
      [classes.collapseItemTextMiniRTL]:
        rtlActive && !propsMiniActive && stateMiniActive,
      [classes.collapseItemTextRTL]: rtlActive,
    });


  return (
    <div className={userWrapperClass} >
      <div className={photo}>
        <img
          src={profile?.profileImage || '/admin/images/faces/avatar1.jpg'}
          className={classes.avatarImg}
          alt='...'
        />
      </div>
      <List className={classes.list}>
        <ListItem className={classes.item + ' ' + classes.userItem}>
          <a
            href={'#'}
            className={classes.itemLink + ' ' + classes.userCollapseButton}
            onClick={(e) => {
              e.preventDefault();
              openCollapse('openAvatar');
            }}>
            <Tooltip
              title={`${profile?.userName}`}
              TransitionComponent={Zoom}
              placement='top'
              arrow
              sx={{ marginLeft: 300 }}>
              <ListItemText
                primary={
                  `${profile?.userName?.slice(0, profile?.userName.indexOf("@"))} ...`
                }
                secondary={
                  <b
                    className={
                      caret +
                      ' ' +
                      classes.userCaret +
                      ' ' +
                      (openAvatar ? classes.caretActive : '')
                    }
                  />
                }
                disableTypography={true}
                className={itemText + ' ' + classes.userItemText}
              />
            </Tooltip>
          </a>
          <Collapse in={openAvatar} unmountOnExit>
            <List className={classes.list + ' ' + classes.collapseList}>
              <ListItem
                className={classes.collapseItem}
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem(`${modelName}_Lookup`)
                  navigate(`/users-page/User?_id=${profile._id}`, {
                    state: profile,
                  })
                  openCollapse('openAvatar');
                }}>
                <a
                  href='/admin/dashboard/user-page'
                  className={
                    classes.itemLink + ' ' + classes.userCollapseLinks + ' ' + `${_id == profile._id ? classes.myProfileDrop : ' '}`
                    // _id == profile._id ? classes.myProfileDrop : ''
                  }>
                  {!isMobile && (
                    <span className={collapseItemMini}>
                      {rtlActive ? 'پ م' : 'MP'}
                    </span>
                  )}
                  <ListItemText
                    primary={t('MyProfile')}
                    disableTypography={true}
                    className={collapseItemText}
                  />
                </a>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </div>
  )
}

SidebarUser.propTypes = {
  rtlActive: PropTypes.bool.isRequired,
  openAvatar: PropTypes.bool.isRequired,
  openCollapse: PropTypes.func.isRequired,
  stateMiniActive: PropTypes.bool.isRequired,
  sideBarbgColor: PropTypes.string.isRequired,
};

export default SidebarUser