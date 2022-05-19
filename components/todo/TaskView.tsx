import React, { useEffect, useState, useContext } from 'react';
import { Input } from './Input';
import { TaskList } from './TaskList';
import { TaskTitle } from './TaskTitle';
import { TaskContext } from './todo-context';

export const TaskView: React.FC = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="rounded-3xl bg-white h-5/6 w-4/5 flex flex-col items-center py-10 space-y-10">
      <TaskTitle />
      <Input />
      <TaskList tasks={tasks} />
    </div>
  );
};
