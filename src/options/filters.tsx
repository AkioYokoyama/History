import React from 'react';
import { FC, useState, useEffect } from "react"

const Filters: FC = () => {
  const [filters, setFilters] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('');

  const handleHistoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHistoryFilter(e.target.value);
  }

  useEffect(() => {
    const storageHistoryFilters: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);
    setFilters(JSON.parse(storageHistoryFilters));
  }, [filters]);

  const handleAddButtonClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (!historyFilter) return;

    const historyFilters: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);
    const filters = JSON.parse(historyFilters);
    filters.push(historyFilter)
    localStorage.setItem('historyFilters', JSON.stringify(filters));
  }

  return (
    <>
      <div className="options__filter">
        <div>filter</div>
        <input className="options__section" type="text" onChange={handleHistoryFilterChange} />
        <div className="options__button-area">
          <input className="options__button options__button--add" type="button" value="追加" onClick={handleAddButtonClick} />
        </div>
      </div>
      <ul>
        {filters.map((filter: string) => {
          return <li>{filter}</li>
        })}
      </ul>
    </>
  );
}

export default Filters;
