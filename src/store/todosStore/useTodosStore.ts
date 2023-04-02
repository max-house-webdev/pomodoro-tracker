import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

import type { TTimeManager } from "../timerStore";

export const TODOS_STORAGE = "pomodoro-Todos-storage";

const persistOptions = {
  name: TODOS_STORAGE,
};

type TTime = {
  minutes: number;
  seconds: number;
};

export type TTodo = {
  id: string;
  title: string;
  workIntervalDuration: number;
  workIntervalNumber: number;
  editable: boolean;
};

type TUpdateTodoTitleArgs = {
  id: string | null;
  title: string;
};

type TUpdateTodoTimeArgs = {
  id: string | null;
  time: TTime;
};

type TToggleTodoEditable = {
  id: string | null;
  editable: boolean;
};

type TAddTodoArgs = {
  title: string;
  timeManager: TTimeManager;
};

type TIntervalArgs = {
  id: string | null;
  timeManager: TTimeManager;
};

type TSetWorkIntervalDurationArgs = {
  id: string | null;
  workIntervalDuration: number;
};

interface IState {
  todos: [] | TTodo[];
  todoError: string | null;

  addTodo: (addTodoArgs: TAddTodoArgs) => void;
  deleteTodo: (id: string | null | undefined) => void;
  completeTodo: (id: string | null | undefined) => void;

  upriseTodo: (id: string | null | undefined) => void;

  updateTodoTitle: (args: TUpdateTodoTitleArgs) => void;

  toggleTodoEditable: (args: TToggleTodoEditable) => void;

  throwTodoError: (errorMessage?: string) => void;
  resetTodoError: () => void;
  getTodoError: () => string | null;

  updateTodoTime: (args: TUpdateTodoTimeArgs) => void;

  increaseTodoWorkIntervalNumber: (args: TIntervalArgs) => void;
  decreaseTodoWorkIntervalNumber: (args: TIntervalArgs) => void;

  increaseTodoWorkIntervalDuration: (args: TIntervalArgs) => void;
  decreaseTodoWorkIntervalDuration: (args: TIntervalArgs) => void;
  getTodosArrayLength: () => number;

  setWorkIntervalDuration: (args: TSetWorkIntervalDurationArgs) => void;
}

export const useTodosStore = create<IState>()(
  devtools(
    //****
    persist((set, get) => {
      return {
        todos: [],
        todoError: null,

        addTodo({ title, timeManager }) {
          if (!title) return;

          set(
            (state) => {
              const id = uuid();

              let todos = state.todos as Array<TTodo>;
              todos.push({
                id,
                title,
                workIntervalDuration: timeManager.workIntervalDuration,
                workIntervalNumber: 1,
                editable: false,
              });

              return {
                ...state,

                todos: [...todos] as Array<TTodo>,
              };
            },
            false,
            "todo/addTodo"
          );
        },

        deleteTodo(id) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.filter((todo) => {
                    return todo.id !== id;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/deleteTodo"
          );
        },

        completeTodo(id) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    return todo.id === id
                      ? { ...todo, workIntervalNumber: 0 }
                      : todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/completeTodo"
          );
        },

        upriseTodo(id) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              const thisTodo = todos.find((todo) => todo.id === id);

              if (!thisTodo) {
                return { ...state };
              }

              const filteredTodos = todos.filter((todo) => todo.id !== id);

              return {
                ...state,
                todos: [thisTodo, ...filteredTodos] as Array<TTodo>,
              };
            },
            false,
            "todo/upriseTodo"
          );
        },

        updateTodoTitle({ id, title }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    return todo.id === id ? { ...todo, title } : todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/updateTodoTitle"
          );
        },

        toggleTodoEditable(args) {
          const { id, editable } = args;

          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    return todo.id === id
                      ? { ...todo, editable }
                      : { ...todo, editable: false };
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/toggleTodoEditable"
          );
        },

        throwTodoError(errorMessage) {
          set(
            (state) => {
              return {
                ...state,
                todoError: errorMessage || "Что-то пошло не так...",
              };
            },
            false,
            "todo/throwTodoError"
          );
        },

        resetTodoError() {
          set(
            (state) => {
              return {
                ...state,
                todoError: null,
              };
            },
            false,
            "todo/resetTodoError"
          );
        },

        getTodoError() {
          return get().todoError;
        },

        updateTodoTime({ id, time }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    return todo.id === id ? { ...todo, time } : todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/updateTodoTime"
          );
        },

        increaseTodoWorkIntervalNumber({ id, timeManager }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    if (todo.id === id) {
                      const { workIntervalNumber } = todo;

                      const increment =
                        workIntervalNumber < timeManager.maxWorkIntervalNumber
                          ? workIntervalNumber + 1
                          : workIntervalNumber;

                      return {
                        ...todo,

                        workIntervalNumber: increment,
                      };
                    }
                    return todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/increaseTodoWorkIntervalNumber"
          );
        },

        decreaseTodoWorkIntervalNumber({ id, timeManager }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                todos: [
                  ...todos.map((todo) => {
                    if (todo.id === id) {
                      const { workIntervalNumber } = todo;

                      const decrement =
                        workIntervalNumber >= timeManager.minWorkIntervalNumber
                          ? workIntervalNumber - 1
                          : workIntervalNumber;

                      return {
                        ...todo,

                        workIntervalNumber: decrement,
                      };
                    }
                    return todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/decreaseTodoWorkIntervalNumber"
          );
        },

        increaseTodoWorkIntervalDuration({ id, timeManager }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    if (todo.id === id) {
                      const increment =
                        todo.workIntervalDuration +
                        timeManager.changeIntervalTimeStep;

                      return {
                        ...todo,

                        workIntervalDuration: increment,
                        time: {
                          minutes: increment,
                          seconds: 0,
                        },
                      };
                    }

                    return todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/increaseTodoWorkIntervalDuration"
          );
        },

        decreaseTodoWorkIntervalDuration({ id, timeManager }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    if (todo.id === id) {
                      const decrement =
                        todo.workIntervalDuration -
                          timeManager.changeIntervalTimeStep >
                        timeManager.workIntervalDuration
                          ? todo.workIntervalDuration -
                            timeManager.changeIntervalTimeStep
                          : timeManager.workIntervalDuration;

                      return {
                        ...todo,

                        workIntervalDuration: decrement,

                        time: {
                          minutes: decrement,
                          seconds: 0,
                        },
                      };
                    }

                    return todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/decreaseTodoWorkIntervalDuration"
          );
        },

        getTodosArrayLength() {
          return get().todos.length;
        },

        setWorkIntervalDuration({ id, workIntervalDuration }) {
          if (!id) return;

          set(
            (state) => {
              let todos = state.todos as Array<TTodo>;

              return {
                ...state,

                todos: [
                  ...todos.map((todo) => {
                    if (todo.id === id) {
                      return {
                        ...todo,

                        workIntervalDuration,

                        time: {
                          minutes: workIntervalDuration,
                          seconds: 0,
                        },
                      };
                    }

                    return todo;
                  }),
                ] as Array<TTodo>,
              };
            },
            false,
            "todo/setWorkIntervalDuration"
          );
        },
      };
    }, persistOptions)
    //****
  )
);
