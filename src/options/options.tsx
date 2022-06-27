import React from 'react';
import { FC, useState, useEffect } from "react"
import ReactDOM from 'react-dom/client';
import Filters from './filters';

const OptionsForm: FC = () => {
  const [historyCount, setHistoryCount] = useState(100);
  const [historyTerm, setHistoryTerm] = useState(7);
  const [historyFilter, setHistoryFilter] = useState('');

  const handleHistoryCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistoryCount(Number(e.target.value));
  }
  const handleHistoryTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistoryTerm(Number(e.target.value));
  }
  const handleHistoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHistoryFilter(e.target.value);
  }

  const handleSubmit = () => {
    localStorage['historyCount'] = historyCount;
    localStorage['historyTerm'] = historyTerm;
  }

  const handleFilterSubmit = () => {
    let filters;
    if (localStorage['historyFilters']) {
      filters = JSON.parse(localStorage['historyFilters'])
    }
    filters.push(historyFilter)
    localStorage['historyFilters'] = JSON.stringify(filters)
  }

  useEffect(() => {
    if (localStorage['historyCount']) {
      setHistoryCount(localStorage['historyCount']);
    }

    if (localStorage['historyTerm']) {
      setHistoryTerm(localStorage['historyTerm']);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <div><input type="submit" value="保存" /></div>
      </form>

      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>filter</label>
          <input type="text" onChange={handleHistoryFilterChange} />
          <div><input type="submit" value="追加" /></div>
        </div>
      </form>
      <Filters />
    </div>
  );
}

const rootElement = document.getElementById('root');
// https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<OptionsForm />);
