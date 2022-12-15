import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/dashboard/firstRow`;

export const getFirstRow = async (adminAccessToken: string) => {
  let firstRow;
  try {
    firstRow = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          token: `Brearer ${adminAccessToken}`,
        },
      })
      .then((res) => {
        return res?.data;
      })
      .catch((error) => {
        return [error.response.data.Error || error.message];
      });
    return firstRow;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};
