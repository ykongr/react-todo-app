export type version = {
  ver : number;
  isFirst: boolean;
}

export type TodoType = {
  id: string;
  name: string;
  isDone: boolean;
  gametype: number; //0:原神 1:崩壊スターレイル 2:鳴潮
  stones: number;
  gachaTimes: number;
  version: version; // 注意
};

export type CalendarType = {
  id: string;
  gameType: number; //0:原神 1:崩壊スターレイル 2:鳴潮
  version: version;
  currentDate: import("dayjs").Dayjs;
};