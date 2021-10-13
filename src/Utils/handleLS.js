const KEY = 'myMarkers';

export const getDataFromLS = () => {
  const markerFromLS = localStorage.getItem(KEY);
  console.log(markerFromLS);
  return JSON.parse(markerFromLS);
};

export const setDataToLS = (item) => {
  localStorage.setItem(KEY, JSON.stringify(item));
};
