import { FC, useState } from 'react'
import PropTypes from 'prop-types'

//Mui Components
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles';

//Mui Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//Hooks
import { useTranslation } from 'react-i18next';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/src/redux/store'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  rtlActive: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, rtlActive, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand, rtlActive }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: rtlActive ? '' : 'auto',
  marginRight: rtlActive ? 'auto' : '',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface ExpandTypes {
  index: number
}

const MultipleExpand: FC<ExpandTypes> = (({ index }: ExpandTypes) => {

  const { t, i18n } = useTranslation('common');
  const expanded = useSelector<State, { [key: string]: boolean }>(state => state.expanded)

  const dispatch = useDispatch();
  const rtlActive = i18n.language == 'fa';

  const handleExpandClick = (index: number) => {
    dispatch({
      type: 'EXPANDED',
      payload: { [`${index}`]: !expanded[index] }
    })
  };

  return (
    <ExpandMore
      expand={expanded[index]}
      rtlActive={rtlActive}
      onClick={() => handleExpandClick(index)}
      aria-expanded={expanded[index]}
      aria-label="show more"
    >
      <Tooltip
        title={expanded[index] ? '' : t('expand')}
        placement='top'
        arrow>
        <ExpandMoreIcon />
      </Tooltip>
    </ExpandMore>
  )
});

MultipleExpand.propTypes = {
  index: PropTypes.number.isRequired
}

export default MultipleExpand;