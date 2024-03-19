export async function load({ fetch, url }) {
  const { pathname } = url;
  const response = await fetch(`data/services.json`);
  const data = await response.json();

  if (data) {
    return {
      status: 200,
      data: {
        data: data,
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
