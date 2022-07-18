import React, { FC } from 'react';
import '../popup.scss'

const GarbageBox: FC<{ handleClickAllDeleteButton: () => void }> = ({ handleClickAllDeleteButton }) => {
  return (
    <div className="garbage-box">
      <img
        onClick={ () => handleClickAllDeleteButton() }
        className="garbage-box--delete-all"
        src="img/delete-all.svg"
        alt="全削除"
      />
    </div>
  );
}

export default GarbageBox;
