import { FC } from "react";
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next";

//Mui
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'

//Icons
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";

//Hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCurrentRouteState from '@/hookes/useCurrentRouteState';

export interface BackButtonProps {
  pushUrl: string;
}


const BackButton: FC<BackButtonProps> = (({ pushUrl }: BackButtonProps) => {
  const { t, i18n } = useTranslation('common');
  const rtlActive = i18n.language == 'fa';
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Tooltip title={t('goBack')} arrow placement='bottom'>
      <IconButton
        onClick={() => {
          navigate(pushUrl)
          localStorage.removeItem(`${modelName}_Lookup`)
        }}>
        {rtlActive ? <ArrowForward /> : <ArrowBack />}
      </IconButton>
    </Tooltip>
  )
})

BackButton.propTypes = {
  pushUrl: PropTypes.string.isRequired
}

export default BackButton;