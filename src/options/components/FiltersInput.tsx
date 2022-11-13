import React from 'react';
import { FC, useState, useEffect } from "react"

export const FiltersInput: FC = () => {
  const storageHistoryWhitelist: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);

  const [whitelist, setWhitelist] = useState(JSON.parse(storageHistoryWhitelist));
  const [historyWhitelist, setHistoryWhitelist] = useState('');
  const [formValue, setFormValue] = useState('');

  const handleHistoryWhitelistChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryWhitelist(e.target.value);
  }

  useEffect(() => { }, [whitelist, formValue]);

  const handleAddButtonClick = (): void => {
    if (!historyWhitelist) return;

    const currnetStorageWhitelist: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);
    const newStorageWhitelist = JSON.parse(currnetStorageWhitelist);
    newStorageWhitelist.push(historyWhitelist)
    localStorage.setItem('historyFilters', JSON.stringify(newStorageWhitelist));
    setWhitelist(newStorageWhitelist);
    setFormValue('');
  }

  const handleDeleteIconClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const newWhitelist = whitelist.filter((f: string) => f !== e.currentTarget.dataset.url);
    localStorage.setItem('historyFilters', JSON.stringify(newWhitelist));
    setWhitelist(newWhitelist);
  }

  return (
    <div className="filters">
      <div>White List</div>
      <input className="options__section" type="text" defaultValue={formValue} onChange={handleHistoryWhitelistChange} />
      <div className="filters__button-area">
        <input className="options__button options__button--add" type="button" value="追加" onClick={handleAddButtonClick} />
      </div>
      <div>登録済み</div>
      <ul className="filters__list">
        {whitelist.map((whitelistUrl: string) => {
          return (
            <li className="filters__list--item">
              <img
                onClick={handleDeleteIconClick}
                data-url={whitelistUrl}
                className="filters__list--delete"
                src="img/cross16.svg"
                alt="x"
              />
              {whitelistUrl}
            </li>)
        })}
      </ul>
    </div>
  );
}
