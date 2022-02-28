import "./App.css";
import React, { useEffect } from "react";
import Board from "react-trello";

const data = require("http://localhost:3000");

const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log("drag ended");
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

function App() {
  const [state, setState1] = React.useState({
    boardData: { lanes: [] },
  });
  // state = { boardData: { lanes: [] } };

  const setEventBus = (eventBus) => {
    setState1({ eventBus });
  };

  // componentDidMount() {
  //   fetch("http://localhost:3000/lanes")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({ boardData: { lanes: data } });
  //     });
  // }

  useEffect(() => {
    fetch("http://localhost:3000/lanes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState1({ boardData: { lanes: data } });
      });
  }, []);

  // create a PUT request to the server when we add a new card
  // Not working yet
  // function postCard(card) {
  //   fetch("http://localhost:3000/lanes/PLANNED", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(card),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setState1({
  //         ...data.conversations,
  //         boardData: { lanes: { PLANNED: { data } } },
  //       });
  //     });
  // }

  // create a delete request to delete a card from api
  // Not working yet
  // const deleteCard = (cardId) => {
  //   fetch(`http://localhost:3000/lanes/${cardId}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setState1({ ...data, boardData: { lanes: data } });
  //     });
  // };

  function getBoard() {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async function abc() {
    const response = await getBoard();
    console.log(response);
    setState1({ boardData: response });
  }

  useEffect(() => {
    abc();
  }, []);

  const completeCard = () => {
    state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "COMPLETED",
      card: {
        id: "Milk",
        title: "Buy Milk",
        label: "15 mins",
        description: "Use Headspace app",
      },
    });
    state.eventBus.publish({
      type: "REMOVE_CARD",
      laneId: "PLANNED",
      cardId: "Milk",
    });
  };

  const addCard = () => {
    state.eventBus.publish({
      type: "ADD_CARD",
      laneId: "BLOCKED",
      card: {
        id: "Ec2Error",
        title: "EC2 Instance Down",
        label: "30 mins",
        description: "Main EC2 instance down",
      },
    });
  };

  const shouldReceiveNewData = (nextData) => {
    console.log("New card has been added");
    console.log(nextData);
  };

  const handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
    // postCard(card);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h3>React Trello Demo</h3>
      </div>
      <div className="App-intro">
        <button onClick={completeCard} style={{ margin: 5 }}>
          Complete Buy Milk
        </button>
        <button onClick={addCard} style={{ margin: 5 }}>
          Add Blocked
        </button>
        <Board
          editable
          onCardAdd={handleCardAdd}
          data={state.boardData}
          // onCardDelete={deleteCard}
          draggable
          onDataChange={shouldReceiveNewData}
          eventBusHandle={setEventBus}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}

export default App;

// Please don't delete, saved for future reference

//class-based component
