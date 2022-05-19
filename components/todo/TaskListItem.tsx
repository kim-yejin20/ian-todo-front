import React, { useState } from 'react';

export type Props = {
  task: TaskItemProps;
  onDeleteItem: (id: number) => void;
  onUpdateItem: (inputData: string, id: number) => void;
  onDoneItem: (id: number, check: boolean) => void;
};

export type TaskItemProps = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export const TaskListItem: React.FC<Props> = (props) => {
  const { task, onDeleteItem, onUpdateItem, onDoneItem } = props;
 
  const [check, setCheck] = useState(task.isCompleted);
  const [editable, setEditable] = useState(false);
  const [inputData, setInputData] = useState(task.content);

  const handlCheckEdit = (data: string, id: number) => {
    if (editable === true) {
      onUpdateItem(data, id);
      setEditable(false);
      return;
    } else {
      setEditable(true);
    }
  };

  const handleTestDone = (id: number) => {
    setCheck(!check);
    onDoneItem(id, check);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={check}
        onChange={() => handleTestDone(task.id)}
        className="w-6 h-6 float-left"
      />
      {editable ? (
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-5/6 break-words border-2 border-yellow-300"
        ></input>
      ) : (
        <div className="w-5/6 break-words">{inputData}</div>
      )}
      <div className="w-1/6 flex justify-center space-x-4 ">
        <button
          onClick={() => handlCheckEdit(inputData, task.id)}
          className="border-2 border-yellow-300 rounded bg-yellow-300 px-1"
        >
          수정
        </button>
        <button
          onClick={() => onDeleteItem(task.id)}
          className="border-2 border-yellow-300 rounded bg-yellow-300 px-1"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
