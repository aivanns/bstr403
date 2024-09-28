import Cookies from 'universal-cookie';
import classes from './SettingsTab.module.css';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function SettingsTab() {
    const cookies = new Cookies()

    function handleSubmit() {
        localStorage.setItem('ip', document.getElementById('ipvalue').value)
        localStorage.setItem('port', document.getElementById('portvalue').value)
    }

    function clearStorage() {
        localStorage.setItem('ip', '212.193.27.248')
        localStorage.setItem('port', '443')
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
        </div>
    </section>
  );

}