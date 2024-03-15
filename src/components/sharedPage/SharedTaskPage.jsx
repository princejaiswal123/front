import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./SharedTaskPage.module.css"
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { FaDiceD6 } from "react-icons/fa";
import box from "../../images/codesandbox.svg"



const SharedTaskPage = ({ match }) => {
  const [sharedTask, setSharedTask] = useState(null);
  const [task, setTask] = useState("")
  // const [newData, setNewData] = useState("")

  let { taskId } = useParams();
  console.log("taskId", taskId);
  const dueDate = moment(sharedTask&&sharedTask.dueDate, 'DD-MM-YYYY').startOf('day');
  const currentDate = moment().startOf('day');
  const isPastDue = dueDate.isBefore(currentDate);
  const formattedDate = moment(sharedTask?.dueDate, 'DD-MM-YYYY').format('MMM Do');
  const completedSubtasks = sharedTask?.subTodos.filter(subTodo => subTodo.isCheck).length || 0;
const totalSubtasks = sharedTask?.subTodos.length || 0;
const checklistText = `Checklist (${completedSubtasks}/${totalSubtasks})`;


  useEffect(() => {
    const fetchSharedTask = async () => {
      console.log("inside fetchSharedTask");
      try {
        console.log("inside ttry");
        const response = await axios.get(`${process.env.React_APP_BACKEND_URL}/api/v1/users/current-user-shared-task/${taskId}`);
        console.log("response", response);
        const sharedTaskData = response.data.data;
        console.log("sharedTaskData", sharedTaskData);
        setSharedTask(sharedTaskData);
      } catch (error) {
        console.log("inside catch");

        console.error(error);
        // Handle error
      }
    };
    fetchSharedTask();
  }, [taskId,sharedTask]);

  //   if (!sharedTask) {
  //     return <div>Loading...</div>;
  //   }

  // Render shared task data on the page
  return (
    <div className={styles.mainOuterCard}>
  
       <div className={styles.outerPro}>  <h3
            className={styles.proClass}>
            <div><img src={box}/></div>
            Pro Manage</h3></div>
      <div className={styles.maincard}>
        <div className={styles.options}>
          <div className={styles.pricontainer}>
            <div className={styles.dot}
              style={{ backgroundColor: (sharedTask?.priority === "LOW PRIORITY") && "#63C05B" ||
               (sharedTask?.priority === "MODERATE PRIORITY") && "#17A2B8"||
              (sharedTask?.priority === "HIGH PRIORITY")&&"red" }}
            ></div>
            <p className={styles.textpriority} >
              {sharedTask?.priority}
            </p>
          </div>
        </div>
        <h1 className={styles.title}>
          {sharedTask?.title}
        </h1>
        <div className={styles.arrowcont}>
          {/* <p className={styles.checklist}>Checklist (1/3)</p> */}
          <p className={styles.checklist}>{checklistText}</p>
        </div>
        <div className={styles.maincheckcont} >
          {
            sharedTask?.subTodos.map((subTodo) => {
              return <div className={styles.checkcont}>
                <input type="checkbox" checked={subTodo?.isCheck} />
                <p className={styles.task}>{subTodo?.text}</p>
              </div>
            })
          }
          
            
              
             
        </div>
     {sharedTask?.dueDate&&
        <div className={styles.statuscont}>
        <h3 className={styles.dueDateText}>Due Date</h3>
        {
          sharedTask?.dueDate &&
          <p className={styles.due} style={{
            backgroundColor: task.complete === "DONE" ? "#63C05B" : (isPastDue ? "#CF3636" : "#5A5A5A")
          }}>
            {formattedDate}
          </p>
        }
      </div>
     }
      </div>
    </div>
  );
};

export default SharedTaskPage;
