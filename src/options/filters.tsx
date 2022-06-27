import React from 'react';
import { FC, useState, useEffect } from "react"

const Filters: FC = () => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (localStorage['historyFilters']) {
      setFilters(JSON.parse(localStorage['historyFilters']));
    }
  }, []);

  return (
    <ul>
      {filters.map((filter) => {
        return <li>{filter}</li>
      })}
    </ul>
  );
}

export default Filters;
