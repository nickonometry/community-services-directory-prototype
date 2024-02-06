export async function load({ fetch, params }) {
  const response = await fetch(`data/services.json`);
  const data = await response.json();

  if (data) {
    return {
      status: 200,
      data
    };
  } else {
    return {
      status: 500,
      body: new Error('Internal Server Error')
    };
  }
}
