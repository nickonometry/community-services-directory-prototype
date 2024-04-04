export async function load({ fetch, url }) {
  const { pathname } = url;

  const response = await fetch(`https://qvzkrcareiwjjtdahkcs.supabase.co/storage/v1/object/public/services/services_update.json`);
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
