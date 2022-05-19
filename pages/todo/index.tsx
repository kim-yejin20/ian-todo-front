import type { NextPage } from 'next';
import Head from 'next/head';
import { TaskView } from '../../components';
import { TaskProvider } from '../../components/todo/todo-context';

const TodoHome: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>TO DO LIST</title>
        <meta name="description" content="Ian's TO DO project" />
      </Head>
      <TaskProvider>
        <div className="h-screen flex flex-col items-center justify-center bg-green-700">
          <TaskView />
        </div>
      </TaskProvider>
    </>
  );
};

export default TodoHome;
