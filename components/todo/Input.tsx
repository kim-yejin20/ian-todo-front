import React, { useState } from 'react';
import axios from 'axios';

export default function Input({ tasks, setTasks }: any) {
  // + button을 누면 input창에 있는 text를 axios로 post요청을 보낸다.

  const [inputData, setInputData] = useState('');

  const createTask = async (todo: string) => {
    if (todo === '') return alert('내용을 입력해주세요');

    const data = await axios
      .post('http://localhost:3000/tasks', {
        content: todo,
      })
      .then(function (res: any) {
        setTasks([res.data, ...tasks]);
        setInputData('');
      });
  };
  return (
    <div className="w-10/12 h-11">
      <input
        type="text"
        value={inputData}
        onChange={(e: any) => setInputData(e.target.value)}
        className="border-2 border-gray-300 rounded w-4/5 float-left h-full"
      />
      <button
        onClick={() => createTask(inputData)}
        className="bg-yellow-300 rounded w-1/6 float-right h-full text-3xl"
      >
        +
      </button>
    </div>
  );
}
