import React from 'react';
import { FC, useState, useEffect } from "react"

const Filters: FC = () => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const storageHistoryFilters: string = localStorage.getItem('historyFilters') ?? JSON.stringify([]);
    setFilters(JSON.parse(storageHistoryFilters));
  }, [filters]);

  return (
    <ul>
      {filters.map((filter: string) => {
        return <li>{filter}</li>
      })}
    </ul>
  );
}

export default Filters;
