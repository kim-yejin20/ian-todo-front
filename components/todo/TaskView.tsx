import React, { useEffect, useState, useContext } from 'react';
import { Input } from './Input';
import { TaskList } from './TaskList';
import { TaskTitle } from './TaskTitle';
import { TaskContext } from './todo-context';

export const TaskView: React.FC = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="md:rounded-3xl bg-white md:h-5/6 md:w-5/6 rounded-none h-full w-full flex flex-col items-center py-10 space-y-7">
      <TaskTitle />
      <Input />
      <TaskList tasks={tasks} />
    </div>
  );
};
