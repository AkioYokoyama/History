import { FC } from 'react';
import { Favicon } from './Favicon';
import '../styleseets/popup.scss'
import truncateTitle from '../modules/truncateTitle'
import { HistoryProps } from '../types/HistoryType'

export const History: FC<HistoryProps> = ({ histories, handleClickDelete }) => {
  return (
    <ul className="history">
      {histories.map((history) => {
        return (
          <li className="history__items" key={history.id}>
            <Favicon url={history.url} />
            <a className="history__items--link"
              href={history.url}
              target="_blank"
              rel="noreferrer">
                {truncateTitle(13, history.title)}
            </a>
            <img
              onClick={handleClickDelete}
              data-url={history.url}
              className="history__items--delete"
              src="img/cross16.svg"
              alt="x"
            />
          </li>
        )
      })}
    </ul>
  );
}
