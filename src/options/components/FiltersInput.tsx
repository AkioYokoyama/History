import { useFiltersWhitelist } from '../modules/useFiltersWhitelist';

export function FiltersInput() {
  const {
    whitelist,
    inputValue,
    handleInputChange,
    addToWhitelist,
    removeFromWhitelist,
  } = useFiltersWhitelist();

  return (
    <div className="mt-5">
      <div className="mb-2.5">
        <label htmlFor="whitelist" className="font-semibold">White List</label>
        <input
          id="whitelist"
          type="text"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm text-gray-900 focus:outline-none"
          defaultValue={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-center">
        <input
          className="w-16 py-1.5 text-white border-none rounded bg-violet-500 hover:opacity-70 hover:cursor-pointer"
          type="button"
          value="追加"
          onClick={addToWhitelist}
        />
      </div>

      <div className="mt-2.5 font-semibold">登録済み</div>
      <ul>
        {whitelist.map((whitelistUrl: string) => {
          return (
            <li>
              <span className="flex items-center leading-5 hover:underline">
                <img
                  onClick={() => removeFromWhitelist(whitelistUrl)}
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
