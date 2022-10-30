import { FC, useState, useEffect, useLayoutEffect, MouseEvent } from 'react';
import { History } from './History';
import { GarbageBox } from './GarbageBox';
import { HistoryType } from '../types/HistoryType'
import '../styleseets/popup.scss'

export const Popup: FC = () => {
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [historyTerm, ] = useState(localStorage['historyTerm'] ?? localStorage['historyTerm']);

  const deleteHistory = (url: string) => chrome.history.deleteUrl({ url: url });

  const getFilters = (): string[] => {
    const storageFilters = localStorage.getItem('historyFilters');
    if (storageFilters) {
        return JSON.parse(storageFilters);
    }
    return [];
  }

  const handleClickDelete = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!e.currentTarget.dataset.url) return;
    deleteHistory(e.currentTarget.dataset.url);
    const updatedHistories = histories.filter((deleteHistory) => deleteHistory.url !== e.currentTarget.dataset.url);
    setHistories(updatedHistories);
  }

  const handleClickAllDeleteButton = () => {
    chrome.history.deleteAll()
    setHistories([])
  }

  useLayoutEffect(() => {
    // TODO any型
    chrome.history.search({'text': '', 'startTime': historyTerm}, (historyItems: any) => {
      const sortHistories = historyItems.sort((a: HistoryType, b: HistoryType) => {
        return (a.visitCount < b.visitCount) ? 1 : -1;
      });
      const filteredHistories = sortHistories.filter((history: HistoryType) => {
        const matched = getFilters().find((f): boolean => history.url === f);
        if (!matched || history.title === '') {
          return deleteHistory(history.url);
        }
        return history;
      });
      setHistories(filteredHistories);
    });
  }, [histories]);

  return (
    <div>
      <GarbageBox handleClickAllDeleteButton={handleClickAllDeleteButton} />
      <History histories={histories} handleClickDelete={handleClickDelete} />
    </div>
  );
}
