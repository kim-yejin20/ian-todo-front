import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import { createContext } from 'react';
import { TaskItemProps } from './TaskListItem';
import { gql, useApolloClient } from '@apollo/client';

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
  const client = useApolloClient();

  useEffect(() => {
    async function getTasks() {
      const { data } = await client.query({
        query: gql`
          query GET_TASKS {
            tasks {
              id
              content
              isCompleted
            }
          }
        `,
      });
      setTasks(data.tasks);
    }
    getTasks();
  }, []);

  // const CreateTask = async (content: string) => {
  //   const res = await axios.post('http://localhost:3000/tasks', {
  //     content,
  //   });
  //   setTasks([res.data, ...tasks]);
  // };

  // mutation CREATE_TASK($input: TaskInput!) {
  //   createTask(input:$input) {
  //     id
  //     content
  //     isCompleted
  //   }
  // }

  // 수정중

  const CreateTask = async (content: string) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CREATE_TASK($input: TaskInput!) {
          createTask(input: $input) {
            id
            content
            isCompleted
          }
        }
      `,
      variables: {
        input: {
          content,
        },
      },
    });
    console.log(data);
    setTasks((prev) => [data.createTask, ...prev]);
  };

  // async function DeleteTask(id: number) {
  //   await axios.delete(`http://localhost:3000/tasks/${id}`);
  //   const newTasks = tasks.filter((task) => task.id !== id);
  //   setTasks(newTasks);
  // }

  const DeleteTask = async (id: number) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DELETE_TASK($id: ID!) {
          deleteTask(id: $id)
        }
      `,
      variables: {
        id,
      },
    });
    console.log(data);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  // async function UpdateTask(id: number, content: string) {
  //   const res = await axios.put(`http://localhost:3000/tasks/${id}`, {
  //     content: content,
  //   });

  //   const newTasks = tasks.map((task) =>
  //     task.id === res.data.id ? { ...task, content: task.content } : task
  //   );
  //   setTasks(newTasks);
  // }

  const UpdateTask = async (id: number, content: string) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UPDATE_TASK($id: ID!, $input: TaskInput!) {
          updateTask(id: $id, input: $input) {
            id
            content
            isCompleted
          }
        }
      `,
      variables: {
        id: id,
        input: {
          content,
        },
      },
    });
    console.log(data);
    const newTasks = tasks.map((task) =>
      task.id === data.updateTask.id ? { ...task, content: task.content } : task
    );
    setTasks(newTasks);
  };

  // async function DoneTask(id: number, check: boolean) {
  //   const res = await axios.put(`http://localhost:3000/tasks/${id}`, {
  //     isCompleted: !check,
  //   });
  //   const newTasks = tasks.map((task) =>
  //     task.id === res.data.id
  //       ? { ...task, isCompleted: task.isCompleted }
  //       : task
  //   );
  //   setTasks(newTasks);
  // }

  const DoneTask = async (id: number, check: boolean) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DONE_TASK($id: ID!, $input: TaskInput!) {
          updateTask(id: $id, input: $input) {
            id
            content
            isCompleted
          }
        }
      `,
      variables: {
        id: id,
        input: {
          isCompleted: !check,
        },
      },
    });

    console.log(data);
    const newTasks = tasks.map((task) =>
      task.id === data.updateTask.id ? { ...task, content: task.content } : task
    );
    setTasks(newTasks);
  };

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
