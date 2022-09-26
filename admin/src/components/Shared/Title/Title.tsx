
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import useStyles from './title-style';
import { FC, ReactNode } from 'react';



type Direction = 'left' | 'right' | 'center'


interface Props {
  children: ReactNode;
  align?: Direction;
}


const Title: FC<Props> = ({ children, align }) => {
  const { classes } = useStyles({});

  const setAlign = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return classes.left;
      case 'right':
        return classes.right;
      case 'center':
        return classes.center;
      default:
        return classes.left;
    }
  };
  return (
    <div className={setAlign(align as Direction)}>
      <Typography variant="h3">
        {children}
      </Typography>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf<Direction>(['left', 'right', 'center']),
};

Title.defaultProps = {
  align: 'left'
};

export default Title;