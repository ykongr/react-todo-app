import type { CalendarType } from "./types";
import { v4 as uuid } from "uuid"; 
import dayjs from "dayjs";

export const initCalendar = (): CalendarType[] => [{
    id: uuid(),
    gameType: 0,
    currentDate: dayjs(new Date(2025, 11, 3)),
    version: { ver: 6.2, isFirst: true }
},{
    id: uuid(),
    gameType: 1,
    currentDate: dayjs(new Date(2025, 10, 5)),
    version: { ver: 3.7, isFirst: true }
},{
    id: uuid(),
    gameType: 2,
    currentDate: dayjs(new Date(2025, 10, 20)),
    version: { ver: 2.8, isFirst: true }
}];