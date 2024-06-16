import type { IFormType } from '@/types/common';

export function usePageControl(form: IFormType, loadData: Function) {
  const setPage = (page: number): void => {
    form.paginationData.page = page;
    loadData();
  };

  return { setPage };
}
