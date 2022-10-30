import React from 'react';
import { FC, useState } from "react"
import ReactDOM from 'react-dom/client';
import FiltersInput from './FiltersInput';
import './options.scss'

const Options: FC = () => {
  const storageHistoryTerm: string = localStorage.getItem('historyTerm') ?? '7';
  const [historyTerm, setHistoryTerm] = useState(storageHistoryTerm);

  const handleHistoryTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryTerm(e.target.value);
  }
  const handleSaveButtonClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    localStorage.setItem('historyTerm', historyTerm);
    e.preventDefault();
  }

  return (
    <>
      <div className="options">
        <div className="options__section">
          <div>表示する履歴の期間</div>
          <input type="text" defaultValue={historyTerm} onChange={handleHistoryTermChange} />
        </div>

        <div className="options__button-area">
          <input className="options__button options__button--save" type="button" value="保存" onClick={handleSaveButtonClick} />
        </div>
      </div>
      <FiltersInput />
    </>
  );
}

const rootElement = document.getElementById('root');
// https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(<Options />);
