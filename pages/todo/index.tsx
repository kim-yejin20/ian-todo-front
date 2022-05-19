import type { NextPage } from 'next';
import Head from 'next/head';
import { TaskView } from '../../components';

const TodoHome: NextPage = () => {
  return (
    <>
      <Head>
        <title>TO DO LIST</title>
        <meta name="description" content="Ian's TO DO project" />
      </Head>
      <div className="h-screen flex flex-col items-center justify-center bg-green-700">
        <TaskView />
      </div>
    </>
  );
};

export default TodoHome;
