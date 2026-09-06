import { useState } from 'react';

const STORAGE_KEY = 'historyFilters';

function readWhitelist(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
  return JSON.parse(raw);
}

function writeWhitelist(list: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function useFiltersWhitelist() {
  const [whitelist, setWhitelist] = useState<string[]>(() => readWhitelist());
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const addToWhitelist = (): void => {
    if (!inputValue) return;
    const current = readWhitelist();
    const next = [...current, inputValue];
    writeWhitelist(next);
    setWhitelist(next);
    setInputValue('');
  };

  const removeFromWhitelist = (url: string): void => {
    const next = whitelist.filter((f) => f !== url);
    writeWhitelist(next);
    setWhitelist(next);
  };

  return {
    whitelist,
    inputValue,
    handleInputChange,
    addToWhitelist,
    removeFromWhitelist,
  };
}
