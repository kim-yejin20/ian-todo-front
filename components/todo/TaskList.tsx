import { TaskListItem } from './TaskListItem';
import { TaskItemProps } from './TaskListItem';

type TaskListProps = {
  tasks: TaskItemProps[];
  onDeleteItem: (id: number) => void;
  onUpdateItem: (inputData: string, id: number) => void;
  onDoneItem: (id: number, check: boolean) => void;
};

export const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks, onDeleteItem, onUpdateItem, onDoneItem } = props;

  return (
    <div className="w-10/12 h-5/6 space-y-3 overflow-y-scroll">
      {tasks?.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          onDoneItem={onDoneItem}
        />
      ))}
    </div>
  );
};
