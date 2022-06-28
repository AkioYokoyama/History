import React from 'react';
import { FC, useState, useEffect } from "react"
import ReactDOM from 'react-dom/client';
import Filters from './filters';

const OptionsForm: FC = () => {
  const storageHistoryCount: string = localStorage.getItem('historyCount') ?? '100';
  const storageHistoryTerm: string = localStorage.getItem('historyTerm') ?? '7';
  const storageHistoryFilters: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);

  const [historyCount, setHistoryCount] = useState(storageHistoryCount);
  const [historyTerm, setHistoryTerm] = useState(storageHistoryTerm);
  const [historyFilter, setHistoryFilter] = useState('');
  const [historyFilters, setHistoryFilters] = useState(storageHistoryFilters);

  const handleHistoryCountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryCount(e.target.value);
  }
  const handleHistoryTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryTerm(e.target.value);
  }
  const handleHistoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryFilter(e.target.value);
  }

  const handleSaveButtonClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    localStorage.setItem('historyCount', historyCount);
    localStorage.setItem('historyTerm', historyTerm);
    e.preventDefault();
  }

  const handleAddButtonClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (!historyFilter) return;

    const filters = JSON.parse(historyFilters);
    filters.push(historyFilter)
    localStorage.setItem('historyFilters', JSON.stringify(filters));
  }

  return (
    <div>
      <div>
        <label>
          表示する履歴の数
          <input type="text" defaultValue={historyCount} onChange={handleHistoryCountChange} />
        </label>
      </div>

      <div>
        <label>
          表示する履歴の期間
          <input type="text" defaultValue={historyTerm} onChange={handleHistoryTermChange} />
        </label>
      </div>
      <div><input type="button" value="保存" onClick={handleSaveButtonClick} /></div>

      <div>
        <label>filter</label>
        <input type="text" onChange={handleHistoryFilterChange} />
        <div><input type="button" value="追加" onClick={handleAddButtonClick} /></div>
      </div>

      <Filters />
    </div>
  );
}

const rootElement = document.getElementById('root');
// https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<OptionsForm />);
