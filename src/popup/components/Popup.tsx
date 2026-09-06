import { MouseEvent } from 'react';
import { History } from './History';
import { GarbageBox } from './GarbageBox';
import { HistoryType } from '../types/HistoryType';
import { usePopupProps } from '../modules/usePopupProps';

function PopupWrapper({
  histories,
  handleClickDelete,
  handleClickAllDeleteButton,
}: {
  histories: HistoryType[];
  handleClickDelete: (e: MouseEvent<HTMLElement>) => void;
  handleClickAllDeleteButton: () => void;
}) {
  return (
    <div className="flex flex-col w-52 p-1 mt-0.5">
      <GarbageBox handleClickAllDeleteButton={handleClickAllDeleteButton} />
      <History histories={histories} handleClickDelete={handleClickDelete} />
    </div>
  );
}

export function Popup() {
  return <PopupWrapper {...usePopupProps()} />
}
