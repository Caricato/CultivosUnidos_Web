export const formatDateTimeToLocal = (datetime = null) => {
  if (datetime != null) {
    return datetime.substr(0, 10);
  }
  return new Date().toLocaleString();
};

export const formatNumber = (x=null) =>{
  if (x != null)
    return 'S/. '+(Math.round(x * 100) / 100).toLocaleString();
  return 0;
}
