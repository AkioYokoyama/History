import { HistoryType } from '../types/HistoryType'

export function sortHistories(historyItems: HistoryType[]) {
  return historyItems.sort((a: HistoryType, b: HistoryType) => {
    return (a.visitCount < b.visitCount) ? 1 : -1;
  });
}

