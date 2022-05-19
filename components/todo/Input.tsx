import React, { useState } from 'react';

type InputProps = {
  onCreateItem: (inputData: string) => void;
};

export const Input: React.FC<InputProps> = (props) => {
  const { onCreateItem } = props;

  const [inputData, setInputData] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleCreateButton = (inputData: string) => {
    if (inputData === '') return alert('내용을 입력해주세요');
    onCreateItem(inputData);
    setInputData('');
  };

  return (
    <div className="w-10/12 h-11">
      <input
        type="text"
        value={inputData}
        onChange={handleChangeInput}
        className="border-2 border-gray-300 rounded w-4/5 float-left h-full"
      />
      <button
        onClick={() => handleCreateButton(inputData)}
        className="bg-yellow-300 rounded w-1/6 float-right h-full text-3xl"
      >
        +
      </button>
    </div>
  );
};
