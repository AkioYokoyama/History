export function GarbageBox({
  handleClickAllDeleteButton
}: {
  handleClickAllDeleteButton: () => void
}) {
  return (
    <div className="flex justify-end mb-1.5">
      <img
        onClick={ () => handleClickAllDeleteButton() }
        className="w-4 h-4 hover:cursor-pointer hover:opacity-70"
        src={chrome.runtime.getURL("img/delete-all.svg")}
        alt="全削除"
      />
    </div>
  );
}
