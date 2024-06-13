import { dataSort } from "../utils/data";

export function companyDataReducer(data, action) {
  switch (action.type) {
    case "filter": {
      if (action.feedData && action.searchTerm !== "") {
        const results = action.feedData.filter(
          (item) =>
            item.name.includes(action.searchTerm) ||
            item.country.includes(action.searchTerm)
        );
        return dataSort(results, action.sortOption, action.status);
      }
      return dataSort(action.feedData, action.sortOption, action.status);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
