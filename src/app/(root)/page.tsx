import { TodoLists } from "@/components/component/todo-lists";
import React from "react";

const Home = () => {
  return (
    <div className="w-screen flex items-center justify-center mx-auto">
      <TodoLists />
    </div>
  );
};

export default Home;
