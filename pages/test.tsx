import type { NextPage } from 'next';
import Head from 'next/head';

const TodoHome: NextPage = () => {
  return (
    <>
      <Head>
        <title>TO DO LIST</title>
        <meta name="description" content="Ian's TO DO project" />
      </Head>
      <div className="h-screen flex flex-col items-center justify-center bg-green-700">
        <div className="rounded-3xl bg-white h-5/6 w-4/5 flex flex-col items-center py-10 space-y-10">
          <h1 className="w-11/12 text-center break-words text-4xl">
            To Do List
          </h1>
          <div className="w-10/12 h-11">
            <input
              type="text"
              className="border-2 border-gray-300 rounded w-4/5 float-left h-full"
            />
            <button className="bg-yellow-300 rounded w-1/6 float-right h-full text-3xl">
              +
            </button>
          </div>
          <div className=" w-10/12 h-5/6 space-y-3">
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-6 h-6 float-left" />
              <div className="w-5/6 break-words">
                할 일 텍스트가 나타나는 곳ssssssssssssssssssssssssssssss
              </div>
              <div className="w-1/6 flex justify-center space-x-3 ">
                <button className="border-2 border-yellow-300 rounded">
                  수정
                </button>
                <button className="border-2 border-yellow-300 rounded">
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoHome;
