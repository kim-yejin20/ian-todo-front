import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';

export type TaskItemProps = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export const TaskListItem: React.FC<{ task: TaskItemProps }> = (props) => {
  const { deleteItem, updateItem } = props;

  const [check, setCheck] = useState(props.task.isCompleted);
  const [editable, setEditable] = useState(false);
  const [inputData, setInputData] = useState(props.task.content);

  const doneTask = async (check: any) => {
    await axios.put(`http://localhost:3000/tasks/${props.task.id}`, {
      isCompleted: !check,
    });
    setCheck(!check);
  };

  const deleteTask = async () => {
    await axios
      .delete(`http://localhost:3000/tasks/${props.task.id}`)
      .then(function (res) {
        deleteItem(props.task.id);
      });
  };

  const updateTask = async () => {
    await axios
      .put(`http://localhost:3000/tasks/${props.task.id}`, {
        content: inputData,
      })
      .then(function (res) {
        updateItem(res.data);
        setEditable(false);
      });
  };

  const changeInput = () => {
    setEditable(true);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={check}
        onClick={() => doneTask(check)}
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
          onClick={editable ? updateTask : changeInput}
          className="border-2 border-yellow-300 rounded"
        >
          수정
        </button>
        <button
          onClick={deleteTask}
          className="border-2 border-yellow-300 rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
