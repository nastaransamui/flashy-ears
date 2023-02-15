import axios from 'axios';
import { getCookies } from 'cookies-next';
export const getGalleryImages = async (model: string) => {
  const url =
    process.env.NODE_ENV == 'development'
      ? `${process.env.NEXT_PUBLIC_HOME_URL}/api/galleryImages`
      : `${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/api/galleryImages`;
  let galleryImages;

  try {
    galleryImages = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { model: model },
      })
      .then((res) => {
        return res?.data?.galleryImages;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });

    return galleryImages;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};
