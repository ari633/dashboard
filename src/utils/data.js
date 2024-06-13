export const dataSort = (data, option, status) => {
  if (data && data.length > 0) {
    
    if (status !== "All") {
      data = data.filter(company => company.status === status.toLowerCase());
    }

    const sortedData = data.sort((a, b) => {
      const nameA = a[option].toUpperCase();
      const nameB = b[option].toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    return sortedData;
  }
};