export const formatDateTimeToLocal = (datetime = null) => {
  if (datetime != null) {
    return datetime.substr(0, 10);
  }
  return new Date().toLocaleString();
};
