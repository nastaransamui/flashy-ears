import axios from 'axios';

export const getProductItems = async (query: any) => {
  const url =
    process.env.NODE_ENV == 'development'
      ? `${process.env.NEXT_PUBLIC_HOME_URL}/api/productItems`
      : `${process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/api/productItems`;
  console.log(query);
  let productItems;
  try {
    productItems = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: query,
      })
      .then((res) => {
        return res?.data?.productItems;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });

    return productItems;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};
