import axios from 'axios';

const url = `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/dashboard/firstRow`;

export const getFirstRow = async () => {
  let firstRow;
  try {
    firstRow = await axios
      .post(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res?.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    return firstRow;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};
