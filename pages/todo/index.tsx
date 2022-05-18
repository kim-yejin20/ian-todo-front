import type { NextPage } from 'next';
import Head from 'next/head';
import TaskTitle from '../../components/todo/TaskTitle';
import Input from '../../components/todo/Input';
import { TaskList } from '../../components/todo/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TodoHome: NextPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const result = await axios.get('http://localhost:3000/tasks');
      setTasks(result.data);
    }
    getTasks();
  }, []);

  return (
    <>
      <Head>
        <title>TO DO LIST</title>
        <meta name="description" content="Ian's TO DO project" />
      </Head>
      <div className="h-screen flex flex-col items-center justify-center bg-green-700">
        <div className="rounded-3xl bg-white h-5/6 w-4/5 flex flex-col items-center py-10 space-y-10">
          <TaskTitle />
          <Input tasks={tasks} setTasks={setTasks} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
};

export default TodoHome;
