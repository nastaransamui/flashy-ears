import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_HOME_VERCEL}api/theme`;

export const getHomeTheme = async () => {
  let homeTheme;
  console.time();
  try {
    homeTheme = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.timeEnd();
        return res?.data?.data;
      })
      .catch((error) => {
        return [error.response.data.Error || error.message];
      });
    return homeTheme;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};
