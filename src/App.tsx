import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [lines, setLines] = useState<number[][]>([
    [20, 5, 2],
    [1, 30,12],
    [6, 15],
    [31, 5,12],
    [40],
  ]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function addPersonToQ(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (itemsInPersonCart === "" || parseInt(itemsInPersonCart) <= 0) {
      alert("Please enter a value greater than 0.");
      return;
    }

    let leastItemsAmount = 1e9;
    let lineWithLeast: number[] | undefined = undefined;

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);

      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    if (!lineWithLeast) {
      return;
    }

    setLines((prevLines) =>
      prevLines.map((line) =>
        line === lineWithLeast ? [...line, parseInt(itemsInPersonCart)] : line
      )
    );

    // Clear the input field after adding the person to the queue
    setItemsInPersonCart("");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        )
      );
    }, 1400);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="App">
      <div className="container mt-4">
        <button
          className="btn btn-primary mt-3 mx-auto d-block"
          onClick={openModal}
        >
          What this is?
        </button>

        <h1 className="text-center">Item Queue</h1>
        <form onSubmit={addPersonToQ} className="text-center">
          <input
            className="form-control"
            type="number"
            value={itemsInPersonCart}
            onChange={(e) => {
              const newValue = e.currentTarget.value;
              if (newValue === "" || parseInt(newValue) >= 0) {
                setItemsInPersonCart(newValue);
              }
            }}
          />
          <button className="btn  btn-primary mt-3">Checkout</button>
        </form>

        <div className="row">
          {lines.map((line, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card mt-3 mb-3 thicker">
                <div className="card-title fw-bold text-center">Queue {idx + 1}</div>
                <div className="card-body text-center d-flex flex-column align-items-center">
                  {line.map((numberOfItems, innerIdx) => (
                    <div className="bolder" key={innerIdx}>
                      {numberOfItems}
                    </div>
                  ))}
                </div>
                <div className="card-footer text-center">
                  <span className="fw-bold">Total :</span> {line.reduce((total, item) => total + item, 0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">About This Project</h5>
                <button type="button" className="close demo" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  This project simulates an item checkout scenario where
                  customers are in a queue. Each number represents the quantity
                  of items in a customer's cart, and they are checked out at
                  regular intervals. Customers are served based on the queue
                  with the least total items, creating an efficient checkout
                  process.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
