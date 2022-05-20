import { useContext } from 'react';
import { TaskListItem } from './TaskListItem';
import { TaskItemProps } from './TaskListItem';
import { TaskContext } from './todo-context';

type TaskListProps = {
  tasks: TaskItemProps[];
};

export const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="w-10/12 h-6/6 space-y-6 overflow-y-scroll  ">
      {tasks?.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
};
