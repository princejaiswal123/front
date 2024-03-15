import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import useAuth from '../hooks/useAuth';
import dayjs from 'dayjs'; 
import styles from "./AddQuestionModal.module.css"
import Loader from '../loader/Loader';

const YourComponent = ({ setAddCard,onSaveHandler }) => {
  const { auth } = useAuth();
  const [title, setTitle] = useState("")
  const [isCompleted, setIsCompleted] = useState("TO-DO")
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [dueDate, setDueDate] = useState(null)
  const [priority, setPriority] = useState("")
  const [tasks, setTasks] = useState([])
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [checkList, setCheckList] = useState(0)
  
  const handleDateSelect = (date) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    const formattedDate2 = moment(date.$d).format('DD/MM/YYYY');
    setSelectedDate(formattedDate);
    setDueDate(formattedDate2);
    setShowCalendar(false);
  };

  const addTsksHandler = () => {
    setTasks([...tasks, { isCheck: false, text: "", isDeleted: false }]);
  };

  const onDeleteHandler = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const onTextChangeHandler = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const onCheckHandler = (index, isChecked) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCheck = isChecked;
    setTasks(updatedTasks);
    const count = isChecked ? completedTasksCount + 1 : completedTasksCount - 1;
    setCompletedTasksCount(count);
  };

  const onSave=async()=>{
    setLoading(true)
    const obj = {
      title: title,
      priority: priority,
      subTodos: tasks,
      dueDate: selectedDate,
      complete: isCompleted,
      user: auth.data
    }
 try {
  await onSaveHandler(obj)
  setLoading(false)

 } catch (error) {
  setLoading(false)

  
 }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.innerOverlay}>
        <div className={styles.contDiv}>
          <div style={{ width: "100%" }}>
            <div className={styles.heading}>Title <span style={{ color: "red" }}>*</span></div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter Task Title' className={styles.input} />
          </div>
          <div className={styles.priortiyDiv}>
            <div className={styles.heading}>Select Priority <span style={{ color: "red" }}>*</span></div>
            <div className={styles.customContainer}>
              <div onClick={() => setPriority("HIGH PRIORITY")} className={styles.choose} style={{backgroundColor:priority==="HIGH PRIORITY"&&"#EEECEC"}}>
                <div className={styles.dot} style={{ backgroundColor: "red" }}></div>
                <p className={styles.textPriority} >
                  HIGH PRIORITY
                </p>
              </div>
              <div onClick={() => setPriority("MODERATE PRIORITY")} className={styles.choose} style={{backgroundColor:priority==="MODERATE PRIORITY"&&"#EEECEC"}}>
                <div className={styles.dot} style={{ backgroundColor: "#17A2B8" }}></div>
                <p className={styles.textPriority}>
                  MODERATE PRIORITY
                </p>
              </div>
              <div onClick={() => setPriority("LOW PRIORITY")} className={styles.choose} style={{backgroundColor:priority==="LOW PRIORITY"&&"#EEECEC"}}>
                <div className={styles.dot} style={{ backgroundColor: "#63C05B" }}></div>
                <p className={styles.textPriority}>
                  LOW PRIORITY
                </p>
              </div>
            </div>
          </div>
          <div className={styles.heading}>Checklist ({completedTasksCount}/{tasks.length}) <span style={{ color: "red" }}>*</span></div>
       <div className={styles.subTodosContainer}>
       <div className={styles.outer}>
            {tasks && tasks.length > 0 && tasks.map((task, index) => (
              <div key={index} className={styles.inner}>
                <div className={styles.inputcustom}>
                  <input
                    type="checkbox"
                    style={{ width: "fit-content" }}
                    checked={task.isCheck}
                    onChange={(e) => onCheckHandler(index, e.target.checked)}
                  />
                  <input className={styles.taskinput}
                    placeholder="Add a task"
                    value={task.text}
                    onChange={(e) => onTextChangeHandler(index, e.target.value)}
                  />
                </div>
                <div className={styles.deleteDiv} onClick={() => onDeleteHandler(index)}>
                  <MdDeleteOutline style={{ color: 'red', fontSize: '1.25rem' }} />
                </div>
              </div>
            ))}
          </div>
       </div>
          <button onClick={addTsksHandler} className={styles.custom}><span><FaPlus /></span>Add Task</button>
          <div className={styles.customflex}>
            {
              dueDate ?
                <div onClick={() => setShowCalendar(true)} className={styles.duebtn}>{dueDate}</div>
                :
                <button onClick={() => setShowCalendar(true)} className={styles.duebtn}>Select Due Date</button>
            }
            <div className={styles.btn}>
              <button onClick={() => { setAddCard(false) }}
                className={styles.customBtn}>Cancel</button>
              <button onClick={async () => await onSave()} className={styles.saveBtn}>
                {loading && (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          )}
          {!loading && "Save"}
                </button>

            </div>
          </div>
        </div>
      </div>
      {showCalendar && (
        <div className={styles.fixedCenter}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate}
              onChange={handleDateSelect} />
          </LocalizationProvider>
        </div>
      )}
    </div>
  );
};

export default YourComponent;




