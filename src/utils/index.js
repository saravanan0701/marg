
const URI = `${process.env.REACT_APP_BACKEND_URL}/`;

export const replaceStaticUrl = (url) => {
  const replaceExps = [
    {
      key: 'http://backend/',
      value: URI,
    },
    {
      key: 'static',
      value: 'backend-static',
    },
    {
      key: 'media',
      value: 'backend-media',
    },
  ];
  return replaceExps.reduce((url, it) => url.replace(it.key, it.value), url);
}