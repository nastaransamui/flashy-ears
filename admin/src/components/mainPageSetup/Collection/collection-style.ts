import { makeStyles } from 'tss-react/mui';
const collectionStyles = makeStyles<{}>({
  name: 'CollectionPage',
  uniqId: 'uniqeIDCollectionPage',
})((theme, _params, classes: any) => {
  return {
    img: {
      borderRadius: 15,
      maxWidth: '25vw',
      maxHeight: '25vw',
      objectFit: 'contain',
      alignSelf: 'center',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '60vw',
        maxHeight: '60vw',
      },
    },
    imgBox: {
      borderRadius: 10,
      marginTop: 5,
      maxWidth: '95% !important',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    deleteButton: {
      width: '100%',
    },
    label: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    labelRoot: {
      width: 'inherit',

      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
    },
    uploadIcon: {
      width: '3em',
      height: '3em',
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('sm')]: {
        height: '3em',
        width: '3em',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    },
    dropIcon: {
      width: '3em',
      height: '3em',
      color: theme.palette.primary.main,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        height: '3em',
        width: '3em',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    },
    listItemHover: {
      background: '',
      '&:hover, &:focus': {
        background: 'unset',

        '& svg:last-of-type': {
          left: theme.direction == 'rtl' ? 'auto' : -10,
          opacity: 1,
        },
      },
    },
    listItemActive: {
      background: theme.palette.action.hover,
      '& #right': {
        left: 10,
        position: 'absolute',
        opacity: 1,
      },
      '& #left': {
        position: 'absolute',
        right: 10,
        opacity: 1,
      },
    },

    listItemHoverSmallArrowLeft: {
      position: 'absolute',
      left: -10,
      opacity: 0,
    },
    listItemHoverSmallArrowRight: {
      position: 'absolute',
      left: 10,
      opacity: 0,
    },
  };
});
export default collectionStyles;
