import React, { useContext, useState } from 'react';
import { TaskContext } from './todo-context';

export type Props = {
  task: TaskItemProps;
};

export type TaskItemProps = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export const TaskListItem: React.FC<Props> = (props) => {
  const { task } = props;

  const [check, setCheck] = useState(task.isCompleted);
  const [editable, setEditable] = useState(false);
  const [inputData, setInputData] = useState(task.content);

  const { UpdateTask, DeleteTask, DoneTask } = useContext(TaskContext);

  const handlCheckEdit = (id: number, data: string) => {
    if (editable === true) {
      UpdateTask(id, data);
      setEditable(false);
      return;
    } else {
      setEditable(true);
    }
  };

  const handleCheckDone = (id: number) => {
    setCheck(!check);
    DoneTask(id, check);
  };

  const handleDelete = (id: number) => {
    DeleteTask(id);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={check}
        onChange={() => handleCheckDone(task.id)}
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
          onClick={() => handlCheckEdit(task.id, inputData)}
          className="border-2 border-yellow-300 rounded bg-yellow-300 px-1"
        >
          수정
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className="border-2 border-yellow-300 rounded bg-yellow-300 px-1"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
