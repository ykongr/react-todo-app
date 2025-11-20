import React from "react";
import type { TodoType } from "./types";

type Props = {
  todo: TodoType;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className={`flex items-center justify-between ${todo.gametype === 0 ? "bg-gensin" : todo.gametype === 1 ? "bg-sutare" : "bg-meityou"} bg-cover p-2`}>
      <div className="flex items-center font-name todo-text font-bold text-2xl">
        {/* <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        /> */}
        {todo.name}
      </div>
      <div className="flex flex-col items-end">
        <button
          onClick={() => props.remove(todo.id)}
          className="rounded-md px-2 py-1 text-sm font-bold text-white hover:bg-red-500 mb-2 -mt-2"
        >
          ×
        </button>
        <div className="text-white text-sm todo-text">ver{todo.version.ver.toFixed(1)} {todo.version.isFirst ? "前半" : "後半"}</div>
        <div className="flex flex-col items-end text-white text-sm">
          <div className="mb-1 todo-text flex"><img src={`${todo.gametype === 0 ? "genseki.png" : todo.gametype === 1 ? "seigyoku.png" : "hosigoe.png"}`} width={30} height={30}></img> {todo.stones}個</div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;