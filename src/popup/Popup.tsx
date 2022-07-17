import React from 'react';
import { FC, useState, useEffect, useLayoutEffect, MouseEvent } from "react"
import ReactDOM from 'react-dom/client';
import Favicon from './Favicon';
import './popup.scss'
import truncateTitle from './truncateTitle'

type History = {
  id: string;
  url: string;
  visitCount: number;
  title: string;
}

const Popup: FC = () => {
  const [histories, setHistories] = useState<History[]>([]);
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
      const sortHistories = historyItems.sort((a: History, b: History) => {
        return (a.visitCount < b.visitCount) ? 1 : -1;
      });
      const filteredHistories = sortHistories.filter((history: History) => {
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
        <div className="garbage-box">
          <img
            onClick={handleClickAllDeleteButton}
            className="garbage-box--delete-all"
            src="img/delete-all.svg"
            alt="全削除"
          />
        </div>
        <ul className="history">
          {histories.map((history) => {
            return (
              <li className="history__items" key={history.id}>
                <Favicon url={history.url} />
                <a className="history__items--link"
                  href={history.url}
                  target="_blank"
                  rel="noreferrer">
                    {truncateTitle(13, history.title)}
                </a>
                <img
                  onClick={handleClickDelete}
                  data-url={history.url}
                  className="history__items--delete"
                  src="img/cross16.svg"
                  alt="x"
                />
              </li>
            )
          })}
        </ul>
      </div>
  );
}

const rootElement = document.getElementById('root');
// https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<Popup />);
