import { useState } from 'react';

export function HistoryTermInput() {
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
    <div>
      <div className="mb-2.5">
        <label htmlFor="historyTerm" className="font-semibold">表示する履歴の期間</label>
        <input
          id="historyTerm"
          type="text"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm text-gray-900 focus:outline-none"
          defaultValue={historyTerm}
          onChange={handleHistoryTermChange}
        />
      </div>

      <div className="text-center">
        <input
          className="w-16 py-1.5 text-white border-none rounded bg-yellow-500 hover:opacity-70 hover:cursor-pointer"
          type="button"
          value="保存"
          onClick={handleSaveButtonClick}
        />
      </div>
    </div>
  );
}
