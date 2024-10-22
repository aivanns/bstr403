import Cookies from 'universal-cookie';
import classes from './SettingsTab.module.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createPortal } from 'react-dom';
import  axios  from 'axios';
import { host } from '../../globals'

async function addUser() {
    const username = document.getElementById('add_username').value;
    const password = document.getElementById('add_password').value;
    const group = document.getElementById('add_group').value;

    await axios
        .post(`http://${host}/user`, {
            username: username,
            password: password,
            group: group
        },
        {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('auth')}`
            }
        })
        .then((response) => {
            console.log(response)
        })
}

export default function SettingsTab() {
    const cookies = new Cookies()
    const [isModalOpen, setModalOpen] = useState(false);

    function handleSubmit() {
        const ip = document.getElementById('ipvalue').value
        const port = document.getElementById('portvalue').value
        if (ip != '') {
            localStorage.setItem('ip', ip)
        }
        if (port != '') {
            localStorage.setItem('port', port)
        }
    }

    function clearStorage() {
        localStorage.setItem('ip', '212.193.27.248')
        localStorage.setItem('port', '443')
    }

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    useEffect(() => {
		if (cookies.get('auth') != undefined) {
			if (Number((Date.now() / 1000).toFixed(0)) > jwtDecode(cookies.get('auth')).exp) {
				cookies.remove('auth', { path: '/' })
				window.location.reload()
			}
	}
    }, []);

    return (
    <section className={classes.settings}>
        <div className={classes.settings_win}>
            <p className={classes.settings_title}>Сеть</p>
            <form action="" className={classes.settings_form}>
                <input type="text" name='ip' id='ipvalue' className={classes.settings_input} placeholder={`IP: ${localStorage.getItem('ip')}`}/>
                <input type="text" name='port' id='portvalue' className={classes.settings_input} placeholder={`Port: ${localStorage.getItem('port')}`}/>
                <button className={classes.btn} onClick={() => handleSubmit()}>Сохранить</button>
                <button className={classes.btn} onClick={() => clearStorage()}>Сбросить</button>
            </form>
            <button className={classes.btn} style={{width:'150px', height:"40px", marginTop:"20px"}} onClick={openModal}>Управление пользователями</button>
        </div>

        {isModalOpen && createPortal(
            <div className={classes.modal}>
                <div className={classes.modal_content}>
                    <div className={classes.modal_header}>
                    <div className={classes.close} onClick={closeModal}>&times;</div>
                    </div>
                    <form className={classes.user_form} onSubmit={(e) => { e.preventDefault(); addUser(); }}>
                        <input type="text" placeholder="Имя" id='add_username' className={classes.user_input} />
                        <input type="password" placeholder="Пароль" id='add_password' className={classes.user_input} />
                        <input type="text" placeholder="Группа" id='add_group' className={classes.user_input} />
                        <button type="submit" className={classes.btn}>Создать</button>
                    </form>
                </div>
            </div>,
            document.body
        )}
    </section>
  );
}
