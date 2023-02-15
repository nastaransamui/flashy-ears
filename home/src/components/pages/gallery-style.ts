import { makeStyles } from 'tss-react/mui';
const galleryStyles = makeStyles<{}>({
  name: 'GalleryPage',
  uniqId: 'uniqeIDgalleryPage',
})((theme, _params, classes: any) => {
  return {
    overlay__caption: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      maxHeight: 240,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      width: '100%',
      color: 'white',
      padding: 2,
      fontSize: '90%',
    },
    ReactGridGallery_tile_description: {
      background: theme.palette.background.paper,
    },
  };
});
export default galleryStyles;
