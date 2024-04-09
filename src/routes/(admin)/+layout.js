export async function load({ fetch, url }) {
  const { pathname } = url;

  if (pathname) {
    return {
      status: 200,
      data: {
        pathname: pathname
      }
    };
  } else {
    return {
      status: 500,
      body: new Error('Internal Server Error')
    };
  }
}
