import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { createContext } from 'react';
import { TaskItemProps } from './TaskListItem';

export type TaskContextProps = {
  tasks: TaskItemProps[];
  children?: ReactElement;
  setTasks: (task: TaskItemProps[]) => void;
  CreateTask: (content: string) => void;
  DeleteTask: (id: number) => void;
  UpdateTask: (id: number, content: string) => void;
  DoneTask: (id: number, check: boolean) => void;
};

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => {},
  CreateTask: () => {},
  DeleteTask: () => {},
  UpdateTask: () => {},
  DoneTask: () => {},
});

export const TaskProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);

  useEffect(() => {
    async function getTasks() {
      const newTasks = await axios.get('http://localhost:3000/tasks');
      setTasks(newTasks.data);
    }
    getTasks();
  }, []);

  const CreateTask = async (content: string) => {
    const res = await axios.post('http://localhost:3000/tasks', {
      content,
    });
    setTasks([res.data, ...tasks]);
  };

  async function DeleteTask(id: number) {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  async function UpdateTask(id: number, content: string) {
    const res = await axios.put(`http://localhost:3000/tasks/${id}`, {
      content: content,
    });

    const newTasks = tasks.map((task) =>
      task.id === res.data.id ? { ...task, content: task.content } : task
    );
    setTasks(newTasks);
  }

  async function DoneTask(id: number, check: boolean) {
    const res = await axios.put(`http://localhost:3000/tasks/${id}`, {
      isCompleted: !check,
    });
    const newTasks = tasks.map((task) =>
      task.id === res.data.id
        ? { ...task, isCompleted: task.isCompleted }
        : task
    );
    setTasks(newTasks);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        CreateTask,
        DeleteTask,
        UpdateTask,
        DoneTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
