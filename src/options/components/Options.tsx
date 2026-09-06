import { HistoryTermInput } from './HistoryTermInput';
import { FiltersInput } from './FiltersInput';

export function Options() {
  return (
    <div className="w-52 p-3">
      <HistoryTermInput />
      <FiltersInput />
    </div>
  );
}
