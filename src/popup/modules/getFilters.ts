 export function getFilters(): string[] {
    const storageFilters = localStorage.getItem('historyFilters');
    return storageFilters ? JSON.parse(storageFilters) : [];
  }
