import { FC } from 'react';
import { Favicon } from './Favicon';
import truncateTitle from '../modules/truncateTitle'
import { HistoryProps } from '../types/HistoryType'

export const History: FC<HistoryProps> = ({ histories, handleClickDelete }) => {
  return (
    <ul className="w-52">
      {histories.map((history) => {
        return (
          <li className="flex items-center space-y-0.5" key={history.id}>
            <a className="flex no-underline hover:opacity-70 hover:underline items-center"
              href={history.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Favicon url={history.url} />
              {truncateTitle(13, history.title)}
            </a>
            <img
              onClick={handleClickDelete}
              data-url={history.url}
              className="ml-auto mr-3 h-2 w-2 hover:cursor-pointer"
              src={chrome.runtime.getURL("img/cross16.svg")}
              alt="x"
            />
          </li>
        )
      })}
    </ul>
  );
}
