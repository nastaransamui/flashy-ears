import { makeStyles } from 'tss-react/mui';
const useStyles = makeStyles<{}>({
  name: 'CollectionPage',
  uniqId: 'uniqeIDcollectionPage',
})((theme, _params) => {
  return {
    title: {
      [theme.breakpoints.down(640)]: {
        display: 'inline-block',
        width: '100%',
        marginTop: 70,
      },
    },
    backToTop: {
      position: 'absolute',
      right: 10,
      padding: 10,
    },
  };
});
export default useStyles;
