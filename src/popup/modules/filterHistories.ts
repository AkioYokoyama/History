import { HistoryType } from '../types/HistoryType'

export function filterHistories(
  sortedHistories: HistoryType[],
  getFilters: () => string[],
  deleteHistory: (url: string) => void,
) {
  return sortedHistories.filter((history: HistoryType) => {
    const matched = getFilters().find((f): boolean => history.url === f);
    if (!matched || history.title === '') {
      return deleteHistory(history.url);
    }
    return history;
  });
}
