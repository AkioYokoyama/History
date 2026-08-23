import { FC } from 'react';
import '../styleseets/popup.scss'

export const GarbageBox: FC<{ handleClickAllDeleteButton: () => void }> = ({ handleClickAllDeleteButton }) => {
  return (
    <div className="flex justify-end garbage-box">
      <img
        onClick={ () => handleClickAllDeleteButton() }
        className="garbage-box--delete-all"
        src={chrome.runtime.getURL("img/delete-all.svg")}
        alt="全削除"
      />
    </div>
  );
}
