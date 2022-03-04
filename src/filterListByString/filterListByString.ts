const prepareToCompare = (str: string) =>
  str.replace(/[.,\-?!]/g, '').toLowerCase();

const SUBSTRING_SEARCH_BORDER = 4;

export const filterListByString = <Data>(
  search: string,
  data: Data[],
  keysToSearch: (keyof Data)[]
): Data[] => {
  if (!search) {
    return data;
  }

  return data.filter((dataItem) =>
    keysToSearch.some((key) =>
      prepareToCompare(search)
        .split(' ')
        .some((subString) => {
          if (subString.length < SUBSTRING_SEARCH_BORDER) {
            return prepareToCompare(String(dataItem[key])).startsWith(
              subString
            );
          }

          return prepareToCompare(String(dataItem[key])) === subString;
        })
    )
  );
};
