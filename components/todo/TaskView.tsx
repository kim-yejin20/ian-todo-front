import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from './Input';
import { TaskList } from './TaskList';
import { TaskTitle } from './TaskTitle';
import { TaskItemProps } from './TaskListItem';

export const TaskView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);

  useEffect(() => {
    async function getTasks() {
      const newTasks = await axios.get('http://localhost:3000/tasks');
      setTasks(newTasks.data);
    }
    getTasks();
  }, []);

  const onCreateItem = async (inputData: string) => {
    const res = await axios.post('http://localhost:3000/tasks', {
      content: inputData,
    });

    setTasks([res.data, ...tasks]);
  };

  const onDeleteItem = async (id: number) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const onUpdateItem = async (inputData: string, id: number) => {
    const res = await axios.put(`http://localhost:3000/tasks/${id}`, {
      content: inputData,
    });

    const newTasks = tasks.map((task) =>
      task.id === res.data.id ? { ...task, content: task.content } : task
    );
    setTasks(newTasks);
  };

  const onDoneItem = async (id: number, check: boolean) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      isCompleted: !check,
    });
  };

  return (
    <div className="rounded-3xl bg-white h-5/6 w-4/5 flex flex-col items-center py-10 space-y-10">
      <TaskTitle />
      <Input onCreateItem={onCreateItem} />
      <TaskList
        tasks={tasks}
        onDeleteItem={onDeleteItem}
        onUpdateItem={onUpdateItem}
        onDoneItem={onDoneItem}
      />
    </div>
  );
};
