import React, { useState } from 'react';
import { createContext } from 'react';

// context로 관리할 것들?
// task, setTask
// (input, setInput) -> create, update 둘 다 있는데 이걸 통합?해서 쓸 수 있을지
// editable, setEditable
// ondelete, onupdate, ondone 함수

type Props = {};

export const TaskContext = createContext({
  state: { task: '' },
  action: {
    setTasks: () => {},
    onCreateItem: () => {},
    onDeleteItem: () => {},
    onUpdateItem: () => {},
  },
});

export const TaskProvider: React.FC<Props> = (props) => {
  const [tasks, setTasks] = useState([]);
  const [inputData, setInputData] = useState('');
  const [editable, setEditable] = useState(false);

  function onCreateItem(input: string) {}

  function onDeleteItem() {}

  function onUpdateItem() {}

  const value = {
    state: { tasks, inputData, editable },
    action: { setTasks, setInputData, setEditable, onCreateItem },
  };

  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
};
