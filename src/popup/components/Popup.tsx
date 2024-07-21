import { FC, useState, useEffect, MouseEvent } from 'react';
import { History } from './History';
import { GarbageBox } from './GarbageBox';
import { HistoryType, DefaultStartTime } from '../types/HistoryType'
import { getFilters } from '../modules/getFilters';
import { sortHistories } from '../modules/sortHistories';
import { filterHistories } from '../modules/filterHistories';
import '../styleseets/popup.scss'

export function usePopupProps() {
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
    chrome.history.search({'text': '', 'startTime': DefaultStartTime}, (historyItems: any) => {
      const sortedHistories = sortHistories(historyItems);
      const filteredHistories = filterHistories(sortedHistories, getFilters, deleteHistory);
      setHistories(filteredHistories);
      setIsInitialize(true);
    });
  }, [isInitialize, historyTerm]);

  return {
    histories,
    handleClickDelete,
    handleClickAllDeleteButton,
  }
}

function PopupWrapper({
  histories,
  handleClickDelete,
  handleClickAllDeleteButton,
}: {
  histories: HistoryType[];
  handleClickDelete: (e: MouseEvent<HTMLElement>) => void;
  handleClickAllDeleteButton: () => void;
}) {

  return (
    <div>
      <GarbageBox handleClickAllDeleteButton={handleClickAllDeleteButton} />
      <History histories={histories} handleClickDelete={handleClickDelete} />
    </div>
  );
}

export const Popup: FC = () => {
  return <PopupWrapper {...usePopupProps()} />
}
