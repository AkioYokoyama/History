import React from 'react';
import { FC, useState, useEffect } from "react"

export const FiltersInput: FC = () => {
  const storageHistoryFilters: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);

  const [filters, setFilters] = useState(JSON.parse(storageHistoryFilters));
  const [historyFilter, setHistoryFilter] = useState('');
  const [formValue, setFormValue] = useState('');

  const handleHistoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryFilter(e.target.value);
  }

  useEffect(() => { }, [filters, formValue]);

  const handleAddButtonClick = (): void => {
    if (!historyFilter) return;

    const historyFilters: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);
    const filters = JSON.parse(historyFilters);
    filters.push(historyFilter)
    localStorage.setItem('historyFilters', JSON.stringify(filters));
    setFilters(filters);
    setFormValue('');
  }

  const handleDeleteIconClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const newFilters = filters.filter((f: string) => f !== e.currentTarget.dataset.url);
    localStorage.setItem('historyFilters', JSON.stringify(newFilters));
    setFilters(newFilters);
  }

  return (
    <div className="filters">
      <div>filter</div>
      <input className="options__section" type="text" defaultValue={formValue} onChange={handleHistoryFilterChange} />
      <div className="filters__button-area">
        <input className="options__button options__button--add" type="button" value="追加" onClick={handleAddButtonClick} />
      </div>
      <ul className="filters__list">
        {filters.map((filter: string) => {
          return <li><span onClick={handleDeleteIconClick} data-url={filter}>x</span>{filter}</li>
        })}
      </ul>
    </div>
  );
}
