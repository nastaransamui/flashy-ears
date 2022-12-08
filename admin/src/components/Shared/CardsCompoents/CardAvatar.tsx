import { FC } from "react";
import PropTypes from 'prop-types'

import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';

import { makeStyles } from "tss-react/mui";
import { useTheme } from "@mui/material";

const avatarStyle = makeStyles<{}>()((theme) => {
  return {
    image: {
      border: 0,
      objectFit: 'cover',
      width: 40,
      height: 40,
      borderRadius: '50%'
    },
    flag: {
      border: 0, width: 70, height: 70, borderRadius: '50%'
    }
  }
})

export interface CardAvatarType {
  avatarType: string;
  path: string;
  imageClass: string;
}


const CardAvatar: FC<CardAvatarType> = (({ avatarType, path, imageClass }: CardAvatarType) => {

  const theme = useTheme();
  const { classes } = avatarStyle({})

  return (
    <Avatar sx={{ bgcolor: theme.palette.primary.main }} >
      {
        avatarType == "icon" ?
          <SvgIcon color='secondary' >
            <path d={path} />
          </SvgIcon>
          :
          <img
            className={classes[imageClass as keyof typeof classes]}
            alt=''
            src={path}
          />
      }
    </Avatar>
  )
})

CardAvatar.defaultProps = {
  imageClass: 'image',
  avatarType: 'img'
}

CardAvatar.propTypes = {
  avatarType: PropTypes.oneOf(['icon', 'img']).isRequired,
  path: PropTypes.string.isRequired,
  imageClass: PropTypes.oneOf(['image', 'flag']).isRequired
}


export default CardAvatar;