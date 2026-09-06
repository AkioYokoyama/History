import { useState } from 'react';

const STORAGE_KEY = 'historyTerm';

function readHistoryTerm(): string {
  const raw = localStorage.getItem(STORAGE_KEY) ?? '7';
  return JSON.parse(raw);
}

function writeHistoryTerm(list: string): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function useHistoryTerm() {
  const storageHistoryTerm = readHistoryTerm();
  const [historyTerm, setHistoryTerm] = useState(storageHistoryTerm);

  const onChangeHistoryTerm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryTerm(e.target.value);
  }
  const onClickSaveButton = (e: React.MouseEvent<HTMLInputElement>): void => {
    writeHistoryTerm(historyTerm);
    e.preventDefault();
  }

  return {
    historyTerm,
    onChangeHistoryTerm,
    onClickSaveButton,
  };
}
