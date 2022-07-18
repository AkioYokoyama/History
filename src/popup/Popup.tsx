import React, { FC, useState, useEffect, useLayoutEffect, MouseEvent } from 'react';
import ReactDOM from 'react-dom/client';
import History from './components/History';
import GarbageBox from './components/GarbageBox';
import { HistoryType } from './types/HistoryType'
import './popup.scss'

const Popup: FC = () => {
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [historyCount, setHistoryCount] = useState(100);
  const [historyTerm, setHistoryTerm] = useState(7);

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

  useEffect(() => {
    if (localStorage['historyCount']) {
      setHistoryCount(localStorage['historyCount']);
    }

    if (localStorage['historyTerm']) {
      setHistoryTerm(localStorage['historyTerm']);
    }
  }, []);

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

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<Popup />);
