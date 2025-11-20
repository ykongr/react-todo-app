import type { TodoType } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: TodoType[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "コロンビーナ",
    isDone: false,
    gametype: 0,
    stones: 25600,
    gachaTimes: 80,
    version: { ver: 6.3, isFirst: true },
  },
  {
    id: uuid(),
    name: "キュレネ",
    isDone: false,
    gametype: 1,
    stones: 25600,
    gachaTimes: 160,
    version: { ver: 3.7, isFirst: true }, 
  },
  {
    id: uuid(),
    name: "千咲",
    isDone: false,
    gametype: 2,
    stones: 38400,
    gachaTimes: 240,
    version: { ver: 2.8, isFirst: true }, 
  },
];