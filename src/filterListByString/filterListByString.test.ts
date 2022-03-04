import { filterListByString } from './filterListByString';

type TestValue = {
  first: string;
  second: string;
  third: string;
}

describe('filterDataBySearch', () => {
  const dataArray: TestValue[] = [
    { first: 'first1', second: 'second1', third: 'third1' },
    { first: 'first2', second: 'second2', third: 'third2' },
    { first: 'first3', second: 'second3', third: 'third3' },
  ];

  it('При пустом поиске возвращает массив без изменений', () => {
    expect(filterListByString('', dataArray, ['first', 'second', 'third'])).toEqual(dataArray);
  });

  it.each<[string, TestValue[]]>([
    ['нет', []],
    ['t', []],
    ['th', []],
    ['thi', []],
    ['f', [...dataArray]],
    ['fi', [...dataArray]],
    ['fir', [...dataArray]],
    ['s', [...dataArray]],
    ['se', [...dataArray]],
    ['sec', [...dataArray]],
  ])(
    'Поиск осуществляется по подстроке %s, возвращаются нужные элементы',
    (search, result) => {
      expect(
        filterListByString(search, dataArray, ['first', 'second'])
      ).toEqual(result);
    }
  );

  it.each<[string, TestValue[]]>([
    ['first', []],
    ['second', []],
    ['third1', []],
    ['third2', []],
    ['first1', [dataArray[0]]],
    ['second2', [dataArray[1]]],
  ])(
    'При поиске по строке %s, возвращаются нужные элементы',
    (search, result) => {
      expect(
        filterListByString(search, dataArray, ['first', 'second'])
      ).toEqual(result);
    }
  );
});
