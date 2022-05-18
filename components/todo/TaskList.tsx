import { TaskListItem, TaskItemProps } from './TaskListItem';
import { useState } from 'react';

export const TaskList: React.FC<{ tasks: TaskItemProps[] }> = (props) => {
  const { tasks, setTasks } = props;

  const deleteItem = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateItem = (res) => {
    console.log('updateItem', res);
    const newTasks = tasks.map((task) =>
      task.id === res.id ? { ...task, content: task.content } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="w-10/12 h-5/6 space-y-3 overflow-y-scroll">
      {props.tasks?.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          deleteItem={deleteItem}
          updateItem={updateItem}
          // editable={editable}
          // setEditable={setEditable}
        />
      ))}
    </div>
  );
};
