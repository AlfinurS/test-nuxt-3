import isArray from '@/utils/isArray';
import type { objectType } from '@/types/common.ts';

// Рекурсивный обход полей объекта со сравнением выражения
export function deepCompareObject(
  objOrString: objectType | string | number | null | string[],
  search: string | null,
  excludeKeys: string[] = []
): boolean {
  if (search === null) {
    return false;
  }
  const regexp = new RegExp(search, 'i');
  if (typeof objOrString === 'number' && objOrString !== undefined) {
    return regexp.test(objOrString.toString());
  }
  if (typeof objOrString === 'string') return regexp.test(objOrString);
  if (isArray(objOrString) || !objOrString) return false;
  let result = false;
  Object.keys(objOrString)
    .filter((key) => !excludeKeys.includes(key))
    .forEach((key) => {
      //@ts-ignore
      if (deepCompareObject(objOrString[key], search, excludeKeys)) {
        result = true;
      }
    });
  return result;
}
