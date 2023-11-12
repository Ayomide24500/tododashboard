import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneProject } from "../api/API";

const TaskApp = async () => {
  const { projectID } = useParams();
  const [newTask, setNewTask] = useState("");
  const [states, setStates]: any = useState({});
  const [selectedSection, setSelectedSection] = useState("todo");
  console.log(projectID);

  setNewTask("");

  // const [state, setState]: any = useState({
  //   ToDo: {
  //     data: [
  //       { id: "task1", task: "Task 1" },
  //       // { id: "task2", task: "Task 2" },
  //       // { id: "task3", task: "Task 3" },
  //       // { id: "task3", task: "Task 4" },
  //     ],
  //   },
  //   Progress: {
  //     data: [],
  //   },
  //   Done: {
  //     data: [],
  //   },
  // });
  const data = [
    { id: "KLKnfghjlkhnkldnk", task: "clean house" },
    { id: "hjhvshvffhjfjhaehv", task: "clean class" },
    { id: "hjhvhvssddhjfjhaehv", task: "clean home" },
    { id: "hjhvhvbchjfjhaehv", task: "clean car" },
  ];

  let mainData = {
    todo: {
      title: "todo",
      data: data,
    },

    progress: {
      title: "progress",
      data: [],
    },
    // Done: {
    //   title: "Done",
    //   data: [],
    // },
  };

  const [state, setState]: any = useState({});

  useEffect(() => {
    getOneProject(projectID!).then((res: any) => {
      setState(res.task);
    });
  }, []);

  const onEnd = (res: any) => {
    console.log(res);
    const { source, destination } = res;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      let soData = state[source.droppableId];
      let deData = state[destination.droppableId];

      let soItem = [...soData.data];
      let deItem = [...deData.data];

      let [remove] = soItem.splice(source.index, 1);
      deItem.splice(destination.index, 0, remove);

      setState({
        ...state,
        [source.droppableId]: {
          ...soData,
          data: soItem,
        },
        [destination.droppableId]: {
          ...deData,
          data: deItem,
        },
      });
    } else {
      let data = state[source.droppableId];
      let item = [...data.data];

      let [remove] = item.splice(source.index, 1);
      item.splice(destination.index, 0, remove);

      setState({
        ...state,
        [source.droppableId]: {
          ...data,
          data: item,
        },
      });

      console.log(item);
    }
  };
  console.log(Object.entries(state)[0]);
  return (
    <Container>
      <Main>
        <Up>
          <H1>Project Dashboard ⭐</H1>
          <SideBox>
            <Span>☝️invite</Span>
            <Hold>
              <Circle bg="orange"></Circle>
              <Circle bg="blue"></Circle>
              <Circle bg="green"></Circle>
            </Hold>
          </SideBox>
        </Up>
        <Down>
          <SideBox1>
            <Button bg="#fff8e5">
              <P col="black">🔔 Notification</P>
            </Button>
            <Button bg="#e4f8eb">
              <P col="black">📽️Project</P>
            </Button>
            <Button bg="#ebe8fe">
              <P col="black">🧑🏻‍🤝‍🧑🏿Client</P>
            </Button>
            <Button bg="#6a60aea2" onClick={addTask}>
              <P col="black"> ➕Add Task</P>
            </Button>
          </SideBox1>
        </Down>
      </Main>
      <Wrapper>
        <DragDropContext onDragEnd={onEnd}>
          {Object.entries(state).map(([key, value]) => (
            <Div key={key}>
              <H2>{key}</H2>
              <Droppable droppableId={key}>
                {(
                  provided: {
                    droppableProps: any;
                    innerRef: any;
                    placeholder: any;
                  },
                  snapshot: { isDraggingOver: any }
                ) => (
                  <BigBox
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? "lightblue" : "",
                      margin: "10px 0",
                      padding: "10px 0",
                      minHeight: "200px",
                    }}
                  >
                    {value?.data?.map((taskProps: any, i: number) => (
                      <Draggable
                        draggableId={taskProps.id}
                        key={taskProps.id}
                        index={i}
                      >
                        {(provided: any, snapshot: any) => (
                          <TaskBox
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <P>{taskProps.task}</P>
                          </TaskBox>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </BigBox>
                )}
              </Droppable>
            </Div>
          ))}
        </DragDropContext>
      </Wrapper>
      {newTask && (
        <TaskForm>
          <input
            type="text"
            value={newTask}
            onChange={(e: any) => setNewTask(e.target.value)}
          />
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="todo">ToDo</option>
            <option value="progress">Progress</option>
            <option value="Done">Done</option>
          </select>
        </TaskForm>
      )}
    </Container>
  );
};

export default TaskApp;
const TaskForm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 999;
`;
const Button = styled.button<{ bg: string }>`
  padding: 10px 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background: ${({ bg }) => bg};
`;

const Div = styled.div``;
const H1 = styled.h1`
  padding-left: 20px;
`;
const H2 = styled.h2``;
const TaskBox = styled.div`
  width: 80%;
  height: 170px;
  margin-top: 19px;
  background: #fff;
  margin-left: 25px;
`;
// const Div = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 19px;
// `;
const P = styled.div<{ col: string; pad: string; pat: string }>`
  font-size: 17px;
  font-weight: bold;
  color: ${({ col }) => col};
  padding-left: ${({ pad }) => pad};
  padding-top: ${({ pat }) => pat};
`;

const Boxes = styled.div<{ bg: string }>`
  width: 150px;
  height: 60px;
  display: flex;
  border-radius: 10px;
  background: ${({ bg }) => bg};
  margin-left: 10px;
`;
const BigBox = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 6px 5px 30px 0px rgb(0 0 0 / 12%);
  /* background: grey; */
`;
const Hold = styled.div`
  display: flex;
  width: 130px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.div<{ bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
`;
const Span = styled.span`
  font-size: 16px;
  color: blue;
  font-weight: bold;
`;
const SideBox1 = styled.div`
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  /* background: white; */
  margin-left: 20px;
`;
const SideBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 60px;
  gap: 20px;
  /* background: pink; */
  margin-right: 20px;
`;
// const H1 = styled.div`
//   font-size: 29px;
//   font-weight: bold;
//   padding-left: 20px;
// `;
const Down = styled.div`
  width: 90%;
  height: 90px;
  display: flex;
  justify-content: center;
  box-shadow: 6px 5px 30px 0px rgb(0 0 0 / 12%);
  background: white;

  align-items: center;
  /* background: white; */
`;
const Up = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Main = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 100px;
  /* background: wheat; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  background: whitesmoke;
`;
