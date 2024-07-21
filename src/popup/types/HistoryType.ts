import {  MouseEvent } from 'react';

export type HistoryType = {
  id: string;
  url: string;
  visitCount: number;
  title: string;
}

export type HistoryProps = {
  histories: HistoryType[];
  handleClickDelete: (e: MouseEvent<HTMLElement>) => void;
}

export const DefaultStartTime = 7;
