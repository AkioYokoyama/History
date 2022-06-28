import React from 'react';
import { FC, useState } from "react"
import ReactDOM from 'react-dom/client';
import Filters from './filters';

const OptionsForm: FC = () => {
  const storageHistoryCount: string = localStorage.getItem('historyCount') ?? '100';
  const storageHistoryTerm: string = localStorage.getItem('historyTerm') ?? '7';

  const [historyCount, setHistoryCount] = useState(storageHistoryCount);
  const [historyTerm, setHistoryTerm] = useState(storageHistoryTerm);

  const handleHistoryCountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryCount(e.target.value);
  }
  const handleHistoryTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryTerm(e.target.value);
  }

  const handleSaveButtonClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    localStorage.setItem('historyCount', historyCount);
    localStorage.setItem('historyTerm', historyTerm);
    e.preventDefault();
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

      <Filters />
    </div>
  );
}

const rootElement = document.getElementById('root');
// https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<OptionsForm />);
