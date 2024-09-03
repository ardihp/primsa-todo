import { createContext } from "react";

const TaskContext = createContext({
  refetchCount: 0,
  refetchTask: [""],
  setRefetchTask: (status: string[]) => {},
});

export default TaskContext;
