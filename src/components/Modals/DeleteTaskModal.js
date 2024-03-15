import React from 'react';
import styles from './DeleteTaskModal.module.css';
import { useState } from 'react';
import Loader from '../loader/Loader';

const DeleteTaskModal = ({ setIsDelete, newData, deleteTask }) => {
    const [loading, setLoading] = useState(false);

    const onDeleteHanler = async (id) => {
        setLoading(true)
        try {
            await deleteTask(id);
            setIsDelete(false);
            setLoading(false)

        } catch (error) {
            setLoading(false)

        }
    }  // console.log("newData", newData);
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalTitle}>
                    Are you sure you want to Delete?
                </h1>
                <div className={styles.buttonContainer}>
                    <button
                        onClick={async () => {
                            await onDeleteHanler(newData?._id)
                        }}
                        className={styles.yesButton}
                    >

                        {loading && (
                            <div className={styles.loaderContainer}>
                                <Loader />
                            </div>
                        )}
                        {!loading && " Yes, Delete"}
                    </button>
                    <button
                        onClick={() => { setIsDelete(false) }}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTaskModal;
