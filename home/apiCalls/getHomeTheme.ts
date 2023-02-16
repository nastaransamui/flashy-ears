import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_ADMIN_URL}/admin/api/home/theme`;

export const getHomeTheme = async () => {
  let homeTheme;
  try {
    homeTheme = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
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
