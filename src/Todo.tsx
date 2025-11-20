import { useState,useEffect } from "react";
import type { TodoType, version } from "./types";
import { initTodos } from "./initTodos";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoVersion, setNewTodoVersion] = useState<version>({ ver: 1.0, isFirst: false });
  const [newTodoGametipe, setNewTodoGametipe] = useState(0);
  const [newTodoStones, setNewTodoStones] = useState(25600);
  const [newTodoGachaTimes, setNewTodoGachaTimes] = useState(160);
  const [initialized, setInitialized] = useState(false); 
  const localStorageKey = "TodoApp";

  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: TodoType[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  // ▼▼ 追加
  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  const updateNewTodoVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const roundedValue = value*10%10 === 9 ? value + 0.1 : value;
    setNewTodoVersion({ ...newTodoVersion, ver: roundedValue });
  };

  const updateNewTodoGametipe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoGametipe(Number(e.target.value));
  };

  const updateNewTodoStones = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoStones(Number(e.target.value));
    setNewTodoGachaTimes((Number(e.target.value)/160));
  };

  const updateNewTodoGachaTimes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoGachaTimes(Number(e.target.value))
    setNewTodoStones((Number(e.target.value)*160))
  };


  const updateIsDone = (id: string, value: boolean) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone: value }; // スプレッド構文
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
  };
  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const remove = (id: string) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
};

  const addNewTodo = () => {
    const newTodo: TodoType = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      gametype: newTodoGametipe,
      stones: newTodoStones,
      gachaTimes: newTodoGachaTimes,
      version: newTodoVersion,
    };
    
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoGametipe(0);
    setNewTodoStones(0);
    setNewTodoGachaTimes(0);
    setNewTodoVersion({ ver: 1.0, isFirst: false });
  };

  return (
    <div className="mx-1 mt-10 max-w-2xl md:mx-auto">
      {/* <h1 className="mb-4 text-2xl font-bold">ガチャ管理アプリ</h1> */}
      <div className="mb-4">
      </div>
      <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />

      <div className="mt-5 space-y-2 rounded-md border p-3">
        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              キャラ名
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className="grow rounded-md border p-2"
            />
          </div>
        </div>
        {/* ...ここまで */}

        <div className="flex gap-5">
          <div className="font-bold min-w-14">ゲーム種</div>
          {[0, 1, 2].map((value) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={value}
                checked={newTodoGametipe === value}
                onChange={updateNewTodoGametipe}
              />
              <span className="sm:text-sm text-xs">{value===0 ? "原神" : value===1 ? "崩壊スターレイル" : "鳴潮"}</span>
            </label>
          ))}
        </div>

        <div className="sm:flex">
          <div className="items-center space-x-2">
            <div className="font-bold min-w-18">
              必要な石
            </div>
            <input
              id="newTodoStones"
              type="number"
              step={160}
              value={newTodoStones}
              onChange={updateNewTodoStones}
              className={twMerge(
                "grow rounded-md border p-2 ",
              )}
            />
          </div>
          <div className="items-center space-x-2 mt-2 sm:mt-0 sm:ml-5">
            <div className="font-bold min-w-18">
              ガチャ回数
            </div>
            <input
              id="newTodoStones"
              type="number"
              value={newTodoGachaTimes}
              onChange={updateNewTodoGachaTimes}
              className={twMerge(
                "grow rounded-md border p-2 ",
              )}
            />
          </div>
        </div>

        <div className="sm:flex items-center space-x-2 mt-2 sm:mt-0">
          <div className="font-bold">
            期限
          </div>
          <input
              id="newTodoStones"
              type="number"
              step={0.1}
              value={newTodoVersion.ver.toFixed(1)}
              onChange={updateNewTodoVersion}
              className={twMerge(
                "grow rounded-md border p-2 ",
              )}
            />
          <label className="sm:text-sm text-xs">
    <input
      type="radio"
      name="isFirst"
      value="first"
      checked={newTodoVersion.isFirst === true}
      onChange={() => setNewTodoVersion({ ...newTodoVersion, isFirst: true })}
    />
    前半
  </label>
  <label className="sm:text-sm text-xs">
    <input
      type="radio"
      name="isFirst"
      value="second"
      checked={newTodoVersion.isFirst === false}
      onChange={() => setNewTodoVersion({ ...newTodoVersion, isFirst: false })}
    />
    後半
  </label>
        </div>

        <button
          type="button"
          onClick={addNewTodo}
          className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default Todo;