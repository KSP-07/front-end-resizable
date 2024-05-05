import React, { useState, useEffect } from "react";
import axios from "axios";
import { PanelResizeHandle, PanelGroup, Panel } from "react-resizable-panels";

export default function Panels() {
  const [data, setData] = useState({ left: "", right: "", lowerBottom: "" });
  const [inputValues, setInputValues] = useState({
    left: "",
    right: "",
    lowerBottom: "",
  });
  const [countValues, setCountValues] = useState({
    left: 0,
    right: 0,
    lowerBottom: 0,
  });
  const [editMode, setEditMode] = useState({
    left: false,
    right: false,
    lowerBottom: false,
  });

  const [count, setCount] = useState(0);
  const [newEntry, setNewEntry] = useState({
    left: false,
    right: false,
    lowerBottom: false,
  });

  useEffect(() => {
    fetchData("left");
    fetchData("right");
    fetchData("lowerBottom");
  }, []);

  const fetchData = (panel) => {
    axios
      .get(`http://localhost:5000/api/panels/${panel}`)
      .then((res) => {
        console.log(res.data.count)
        setData((prevData) => ({ ...prevData, [panel]: res.data.data }));
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [panel]: res.data.data,

          // count : res.data.count,
        }));
        setCountValues((prevCountValues) => ({
          ...prevCountValues,
          [panel]: res.data.count,
          // count : res.data.count,
        }));
        console.log([panel]);
      })
      .catch((err) => console.error(err));
  };

  const clearInput = (panel) => {
    axios
      .delete(`http://localhost:5000/api/panels/${panel}/delete`)
      .then(() => {
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [panel]: "",
        }));
        // setInputValues((prevInputValues) => ({ ...prevInputValues, [panel]: "" }));
        // setEditMode((prevEditMode) => ({ ...prevEditMode, [panel]: false }));
      })
      .catch((err) => console.error(err));
  };
  const handleAdd = (panel) => {
    console.log(newEntry);
    if (newEntry === true && panel.data) {
      clearInput(panel);
    }
    // fetchData(panel)
    setInputValues((prevInputValues) => ({ ...prevInputValues, [panel]: "" }));
    setEditMode((prevEditMode) => ({ ...prevEditMode, [panel]: true }));
  };

  const handleEdit = (panel) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [panel]: true }));
  };

  const handleSubmit = (panel) => {
    console.log(newEntry[panel]);
    if (newEntry[panel] === true) {
      axios
        .post(`http://localhost:5000/api/panels/${panel}/add`, {
          data: inputValues[panel],
          count: countValues[panel] + 1,
        })
        .then(() => {
          fetchData(panel);
          console.log(data);
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [panel]: "",
          }));
          setEditMode((prevEditMode) => ({ ...prevEditMode, [panel]: false }));
          // setNewEntry(({[panel]: false }));
          // setNewEntry(false);
          setNewEntry((prevNewEntry) => ({ ...prevNewEntry, [panel]: false }));
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .put(`http://localhost:5000/api/panels/${panel}/update`, {
          data: inputValues[panel],
          count: countValues[panel] + 1,
        })
        .then(() => {
          fetchData(panel);
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [panel]: "",
          }));
          setEditMode((prevEditMode) => ({ ...prevEditMode, [panel]: false }));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="wrapper">
      <div className="count">Count : {count}</div>
      <PanelGroup direction="horizontal" style={{ height: "100vh" }}>
        <Panel style={{ background: "white" }} defaultSize={0}>
          o-left
        </Panel>
        <PanelResizeHandle />
        <Panel style={{ background: "blue" }}>
          <PanelGroup direction="vertical">
            <Panel style={{ color: "white" }} defaultSize={0}>
              top
            </Panel>
            <PanelResizeHandle />
            <Panel style={{ background: "grey" }}>
              <PanelGroup direction="vertical">
                <Panel style={{ background: "red" }} defaultSize={40}>
                  <PanelGroup direction="horizontal">
                    <Panel style={{ background: "orange" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Left: {newEntry.left === false ? data.left : ""}
                        {editMode.left && (
                          <>
                            <input
                              type="text"
                              value={inputValues.left}
                              onChange={(e) =>
                                setInputValues((prevInputValues) => ({
                                  ...prevInputValues,
                                  left: e.target.value,
                                }))
                              }
                            />
                            <button onClick={() => handleSubmit("left")}>
                              Save
                            </button>
                          </>
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            onClick={() => {
                              // setNewEntry(true);
                              // setNewEntry(({left: true }));
                              setNewEntry((prevNewEntry) => ({
                                ...prevNewEntry,
                                left: true,
                              }));
                              handleAdd("left");
                              setCount(() => count + 1);
                              
                            }}
                          >
                            Add
                          </button>

                          <button
                            onClick={() => {
                              handleEdit("left");
                              setCount(() => count + 1);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div>Count : {countValues.left}</div>
                      </div>
                    </Panel>
                    <PanelResizeHandle />
                    <Panel style={{ background: "red" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Right: {newEntry.right === false ? data.right : ""}
                        {editMode.right && (
                          <>
                            <input
                              type="text"
                              value={inputValues.right}
                              onChange={(e) =>
                                setInputValues((prevInputValues) => ({
                                  ...prevInputValues,
                                  right: e.target.value,
                                }))
                              }
                            />
                            <button onClick={() => handleSubmit("right")}>
                              Save
                            </button>
                          </>
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            onClick={() => {
                              setNewEntry((prevNewEntry) => ({
                                ...prevNewEntry,
                                right: true,
                              }));
                              handleAdd("right");
                              setCount(() => count + 1);
                            }}
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              handleEdit("right");
                              setCount(() => count + 1);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                        <div>Count : {countValues.right}</div>
                        </div>
                      </div>
                    </Panel>
                  </PanelGroup>
                </Panel>
                <PanelResizeHandle />
                <Panel style={{ background: "green" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    LowerBottom:{" "}
                    {newEntry.lowerBottom === false ? data.lowerBottom : ""}
                    {editMode.lowerBottom && (
                      <>
                        <input
                          type="text"
                          value={inputValues.lowerBottom}
                          onChange={(e) =>
                            setInputValues((prevInputValues) => ({
                              ...prevInputValues,
                              lowerBottom: e.target.value,
                            }))
                          }
                        />
                        <button onClick={() => handleSubmit("lowerBottom")}>
                          Save
                        </button>
                      </>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() => {
                          setNewEntry((prevNewEntry) => ({
                            ...prevNewEntry,
                            lowerBottom: true,
                          }));
                          handleAdd("lowerBottom");
                          setCount(() => count + 1);
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          handleEdit("lowerBottom");
                          setCount(() => count + 1);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                    Count : {countValues.lowerBottom}
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            <PanelResizeHandle />
            <Panel style={{ background: "white" }} defaultSize={0}>
              bottom
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel style={{ background: "white" }} defaultSize={0}>
          o-right
        </Panel>
      </PanelGroup>
    </div>
  );
}
