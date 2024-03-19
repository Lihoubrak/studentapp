const formatDateTime = (dateTimeString) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Date(dateTimeString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};
export default formatDateTime;
