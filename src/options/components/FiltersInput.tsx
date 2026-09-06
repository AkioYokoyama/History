import React from 'react';
import { useState, useEffect } from "react"

export function FiltersInput() {
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
    <div className="mt-5">
      <div className="mb-2.5">
        <label htmlFor="whitelist" className="font-semibold">White List</label>
        <input
          id="whitelist"
          type="text"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm text-gray-900 focus:outline-none"
          defaultValue={formValue}
          onChange={handleHistoryWhitelistChange}
        />
      </div>
      <div className="text-center">
        <input
          className="w-16 py-1.5 text-white border-none rounded bg-violet-500 hover:opacity-70 hover:cursor-pointer"
          type="button"
          value="追加"
          onClick={handleAddButtonClick}
        />
      </div>

      <div className="mt-2.5 font-semibold">登録済み</div>
      <ul>
        {whitelist.map((whitelistUrl: string) => {
          return (
            <li>
              <span className="flex items-center leading-5 hover:underline">
                <img
                  onClick={handleDeleteIconClick}
                  data-url={whitelistUrl}
                  className="w-2.5 h-2.5 mr-1.5 hover:cursor-pointer"
                  src={chrome.runtime.getURL("img/cross16.svg")}
                  alt="x"
                />
                {whitelistUrl}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
