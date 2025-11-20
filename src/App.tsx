import React from "react";
import Todo from "./Todo";
// import ContentsButton from "./ContentsButton";

const App = () => {
  // const [isTodo, setIsTodo] = React.useState(true);
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 pb-20 px-4">
      <h1 className="text-5xl font-name ">ガチャ管理アプリ</h1>
      {/* <ContentsButton isTodo={isTodo} setIsTodo={setIsTodo} /> */}
      <Todo />
    </div>
  );
};

export default App;