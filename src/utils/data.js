export const dataSort = (data, option, status, callback) => {
  if (data) {
    
    if (status !== "All") {
      data = data.filter(company => company.status === status.toLowerCase());
    }

    const sortedData = data.sort((a, b) => {
      const nameA = a[option].toUpperCase();
      const nameB = b[option].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    callback(sortedData);
  }
};