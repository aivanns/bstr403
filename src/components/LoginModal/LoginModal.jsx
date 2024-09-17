import React from "react";
import styles from "./LoginModal.module.css";
import { RiCloseLine } from "react-icons/ri";
import Auth from "./Auth";

const LoginModal = ({ setIsOpen }) => {

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Авторизация  </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <form action="">
                <input className={styles.input} id='login' type="text" placeholder="Логин" />
                <input className={styles.input} id='password' type="password" placeholder="Пароль"/>
            </form>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => Auth(document.getElementById('login').value, document.getElementById('password').value)}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;