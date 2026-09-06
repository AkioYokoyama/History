import { useHistoryTerm } from '../modules/useHistoryTerm';

export function HistoryTermInput() {
  const {
    historyTerm,
    onChangeHistoryTerm,
    onClickSaveButton,
  } = useHistoryTerm();

  return (
    <div>
      <div className="mb-2.5">
        <label htmlFor="historyTerm" className="font-semibold">表示する履歴の期間</label>
        <input
          id="historyTerm"
          type="text"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm text-gray-900 focus:outline-none"
          defaultValue={historyTerm}
          onChange={onChangeHistoryTerm}
        />
      </div>

      <div className="text-center">
        <input
          className="w-16 py-1.5 text-white border-none rounded bg-yellow-500 hover:opacity-70 hover:cursor-pointer"
          type="button"
          value="保存"
          onClick={onClickSaveButton}
        />
      </div>
    </div>
  );
}
