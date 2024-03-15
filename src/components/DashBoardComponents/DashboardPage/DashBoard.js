import React, { useState, Fragment } from 'react'
import styles from "./DashBoard.module.css"
import { RiFileCopy2Line } from "react-icons/ri";
import Card from '../../card/Card';
import { FaPlus } from "react-icons/fa6";
import AddQuestionModal from '../../Modals/AddQuestionModal'
import { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Listbox, } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

const sortByOptions = [
  { id: 1, name: 'This Week', unavailable: false },
  { id: 2, name: 'Today', unavailable: false },
  { id: 3, name: 'This Month', unavailable: true },
]

const DashBoard = () => {
  const { auth } = useAuth()
  const [sortBy, setSortBy] = useState(sortByOptions[0])
  const [addCard, setAddCard] = useState(false)
  const [todoData, setTodoData] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)
  const token = localStorage.getItem('accessToken');

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`${process.env.React_APP_BACKEND_URL}/api/v1/users/${id}`,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
      );
      // console.log("res",res);
      setTodoData(todoData.filter((task) => task._id !== id));
      toast.success("Deleted successfully.")
      setIsDeleted(true)
    } catch (err) {
      toast.error("Something went wrong!")
      // console.log(err);
    }
  };


  const onSaveHandler = async (obj) => {
    if (obj?.title === "" || obj?.priority === "" || obj.subTodos.length === 0) {
      toast.error("Please fill madatory fields!")
      return
    }
    try {
      const response = await axios.post(`${process.env.React_APP_BACKEND_URL}/api/v1/users/create-task`, obj,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
      );
      const data = response?.data?.data
      setTodoData(prevState => [...prevState, { ...data }]);
      setAddCard(false)
      toast.success("Task added successfully.")
    } catch (error) {
      toast.error("Somethign went wrong!")
    }
  }

  const updateTodoData = (id, status) => {
    setTodoData(prevState => {
      return prevState.map(todo => {
        if (todo._id === id) {
          console.log({ ...todo, complete: status });
          return { ...todo, complete: status };
        }
        return todo;
      });
    });
  }

  const editTodoData = (id, updatedTask) => {
    console.log("editTodoData", id, updatedTask);
    setTodoData(prevState => {
      return prevState.map(todo => {
        if (todo?._id === id) {
          console.log("if");
          return { ...updatedTask }
        }
        return todo
      })
    })
   
  }

  useEffect(() => {
    console.log("Inside sorted use effect");
    const onSortHandler = async () => {
      const by = sortBy.name
      try {
        const response = await axios.get(`${process.env.React_APP_BACKEND_URL}/api/v1/users/current-user-week/${by}`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
        );
        const data = response.data.data
        // console.log(response, "res");
        setTodoData([...data])
      } catch (error) {
        // console.log(error);
      }
    }
    onSortHandler()
  }, [sortBy])

  useEffect(() => {
    const getCurrentUserTasks = async () => {
      console.log(token,'token');
      try {
        const response = await axios.get(`${process.env.React_APP_BACKEND_URL}/api/v1/users/current-user-task-todo`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        console.log(response?.data?.data, "res");
        const data = response?.data?.data
        setTodoData([...data])
      } catch (error) {
        // console.error(error);
      }
    };

    getCurrentUserTasks();
    console.log("inside effect");
  }, []);


  return (
    <div className={styles.body}>
      <div className={styles.mainboard}>
        <div className={styles.boardtitle}>Welcome! {auth?.data?.fullName}</div>
        <div className={styles.sortDiv}>
          <div className={styles.boardtitle}>Board</div>
          <div className={styles.dropdown}>
            <Listbox value={sortBy} onChange={setSortBy}>
              <div className=' '>
                <Listbox.Button className={styles.listbtn}><span>{(sortBy?.name) || "Select"}</span><span>
                  <div><IoIosArrowDown style={{ height: "16px", width: "16px" }} /></div>
                </span></Listbox.Button>
                <Listbox.Options className={styles.listoption} >
                  {sortByOptions && sortByOptions.length > 0 && sortByOptions.map((category) => (
                    <Listbox.Option key={category.id} value={category} as={Fragment}  >
                      {({ active, selected }) => (
                        <li
                          style={{ backgroundColor: active && "#EEF2F5" }}
                          className={styles.singleOption}
                        >
                          <span>
                            {category.name}
                          </span>
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      <div className={styles.boardoutercont}>
        <div className={styles.boardinnercont}>
          <div className={styles.boardScrollcont}>
            <div className={styles.titlecontainer}>
              <h4 className={styles.title}>Backlog</h4>
              <div><RiFileCopy2Line /></div>
            </div>
            <div className={styles.cardContainer}>
              {todoData && todoData.length > 0 && todoData.filter((todo) => todo?.complete === "BACKLOG").map((todo, idx) => {
                return <div key={todo?._id}>
                  <Card data={todo} deleteTask={deleteTask} status={["PROGRESS", "TO-DO", "DONE"]} updateTodoData={updateTodoData} editTodoData={editTodoData} />
                </div>
              })}
            </div>
          </div>
        </div>
       <div className={styles.boardinnercont}>
       <div className={styles.boardScrollcont}>
          <div className={styles.titlecontainer}>
            <h4 className={styles.title}>To do</h4>
            <div className={styles.iconCon}>
              <div onClick={() => setAddCard(true)}><FaPlus /></div>
              <div><RiFileCopy2Line /></div>
            </div>
          </div>
          <div className={styles.cardContainer}>
            {todoData && todoData?.length > 0 && todoData.filter((todo) => todo?.complete === "TO-DO").map((todo, idx) => {
              return <div key={todo?._id}>
                <Card data={todo} deleteTask={deleteTask} status={["BACKLOG", "PROGRESS", "DONE"]} updateTodoData={updateTodoData} editTodoData={editTodoData} />
              </div>
            })}
          </div>
        </div>
       </div>
      <div className={styles.boardinnercont}>
      <div className={styles.boardScrollcont}>
          <div className={styles.titlecontainer}>
            <h4 className={styles.title}>In progress</h4>
            <div><RiFileCopy2Line /></div>
          </div>
          <div className={styles.cardContainer}>
            {todoData && todoData.length > 0 && todoData.filter((todo) => todo?.complete === "PROGRESS").map((todo, idx) => {
              return <div key={todo?._id}>
                <Card data={todo} deleteTask={deleteTask} status={["BACKLOG", "TO-DO", "DONE"]} updateTodoData={updateTodoData} editTodoData={editTodoData} />
              </div>
            })}
          </div>
        </div>
      </div>
     <div className={styles.boardinnercont}>
     <div className={styles.boardScrollcont}>
          <div className={styles.titlecontainer}>
            <h4 className={styles.title}>Done</h4>
            <div><RiFileCopy2Line /></div>
          </div>
          <div className={styles.cardContainer}>
            {todoData && todoData.length > 0 && todoData.filter((todo) => todo?.complete === "DONE").map((todo, idx) => {
              return <div key={todo?._id}>
                <Card data={todo} deleteTask={deleteTask} status={["BACKLOG", "TO-DO", "PROGRESS"]} updateTodoData={updateTodoData} editTodoData={editTodoData} />
              </div>
            })}
          </div>
        </div>
     </div>
      </div>
      {addCard && <AddQuestionModal setAddCard={setAddCard} onSaveHandler={onSaveHandler} />}
    </div>
  )
}

export default DashBoard