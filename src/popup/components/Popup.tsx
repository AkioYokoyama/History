import { FC, useState, useEffect, MouseEvent } from 'react';
import { History } from './History';
import { GarbageBox } from './GarbageBox';
import { HistoryType, DefaultStartTime } from '../types/HistoryType'
import { getFilters } from '../modules/getFilters';
import '../styleseets/popup.scss'

export const Popup: FC = () => {
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [historyTerm, ] = useState(localStorage['historyTerm'] ?? localStorage['historyTerm']);
  const [isInitialize, setIsInitialize] = useState(false);

  const deleteHistory = (url: string) => chrome.history.deleteUrl({ url: url });

  const handleClickDelete = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!e.currentTarget.dataset.url) return;
    deleteHistory(e.currentTarget.dataset.url);
    const updatedHistories = histories.filter((deleteHistory) => deleteHistory.url !== e.currentTarget.dataset.url);
    setHistories(updatedHistories);
  }

  const handleClickAllDeleteButton = () => {
    chrome.history.deleteAll();
    setHistories([]);
  }

  useEffect(() => {
    // TODO any型
    chrome.history.search({'text': '', 'startTime': DefaultStartTime}, (historyItems: any) => {
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
      setIsInitialize(true);
    });
  }, [isInitialize, historyTerm]);

  return (
    <div>
      <GarbageBox handleClickAllDeleteButton={handleClickAllDeleteButton} />
      <History histories={histories} handleClickDelete={handleClickDelete} />
    </div>
  );
}
