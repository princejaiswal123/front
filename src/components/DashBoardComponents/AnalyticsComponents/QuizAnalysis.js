import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './QuizAnalysis.module.css';
import moment from "moment"

const QuizAnalysis = () => {
  const [todoData, setTodoData] = useState([])
  const [dueData, setDueData] = useState(0)
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const getCurrentUserTasks = async () => {
      try {
        const response = await axios.get(`${process.env.React_APP_BACKEND_URL}/api/v1/users/current-user-task-todo`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
        );
        // console.log(response, "res");
        setTodoData(response?.data?.data);
        const currentDate = moment().startOf('day');
        const due = response?.data?.data.filter(todo => {
          const dueDate = moment(todo.dueDate, 'DD-MM-YYYY');
          return dueDate.isBefore(currentDate, 'day');
        });
        setDueData(due.length)
      } catch (error) {
        // console.error(error);
      }
    };
    getCurrentUserTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Analytics</div>
      <div className={styles.tasks}>
        <div className={styles.card}>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                Backlog Tasks
              </div>
              <div>{todoData.filter((todo) => todo?.complete === "BACKLOG").length?todoData.filter((todo) => todo?.complete === "BACKLOG").length:0}</div>
            </div>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                To do Tasks
              </div>
              <div>{todoData.filter((todo) => todo?.complete === "TO-DO").length?todoData.filter((todo) => todo?.complete === "TO-DO").length:0}</div>
            </div>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                In-Progress Tasks
              </div>
              <div>{todoData.filter((todo) => todo?.complete === "PROGRESS").length?todoData.filter((todo) => todo?.complete === "PROGRESS").length:0}</div>
            </div>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                Completed Tasks
              </div>
              <div>{todoData.filter((todo) => todo?.complete === "DONE").length}</div>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                Low Priority
              </div>
              <div>{todoData.filter((todo) => todo?.priority === "LOW PRIORITY").length?todoData.filter((todo) => todo?.priority === "LOW PRIORITY").length:0}</div>
            </div>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                Moderate Priority
              </div>
              <div>{todoData.filter((todo) => todo?.priority === "MODERATE PRIORITY").length?todoData.filter((todo) => todo?.priority === "MODERATE PRIORITY").length:0}</div>
            </div>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                High Priority
              </div>
              <div>{todoData.filter((todo) => todo?.priority === "HIGH PRIORITY").length?todoData.filter((todo) => todo?.priority === "HIGH PRIORITY").length:0}</div>
            </div>
            <div className={styles.task}>
              <div className={styles.priority}>
                <div className={styles.dot} style={{ backgroundColor: '#90C4CC' }}></div>
                Due Tasks
              </div>
              <div>{dueData?dueData:0}</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default QuizAnalysis;
