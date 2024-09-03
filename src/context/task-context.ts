import { createContext } from "react";

const TaskContext = createContext({
  refetchTask: 0,
  setRefetchTask: () => {},
});

export default TaskContext;
