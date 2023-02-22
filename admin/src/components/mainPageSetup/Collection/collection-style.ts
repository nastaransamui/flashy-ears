import { makeStyles } from 'tss-react/mui';
const collectionStyles = makeStyles<{}>({
  name: 'CollectionPage',
  uniqId: 'uniqeIDCollectionPage',
})((theme, _params, classes: any) => {
  return {
    img: {
      borderRadius: 15,
      maxWidth: 'inherit',
      objectFit: 'contain',
    },
    imgBox: {
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      padding: 10,
    },
    deleteButton: {
      paddingBottom: '1em',
      width: '100%',
    },
    label: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    labelRoot: {
      width: 'inherit',
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
    },
    uploadIcon: {
      width: '9em',
      height: '5em',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('sm')]: {
        height: '10em',
        width: '5em',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    },
  };
});
export default collectionStyles;
