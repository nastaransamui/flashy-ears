import axios from 'axios';

export const getHomeSlides = async () => {
  const url =
    process.env.NODE_ENV == 'development'
      ? `${process.env.NEXT_PUBLIC_HOME_URL}/api/homeSlides`
      : `${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/api/homeSlides`;

  let homeSlides;
  try {
    homeSlides = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res?.data?.slides;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });

    return homeSlides;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};