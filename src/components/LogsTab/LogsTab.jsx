import Cookies from 'universal-cookie'
import classes from './LogsTab.module.css'
import LogTableElement from '../LogTableElement/LogTableElement';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IoMdRefresh } from "react-icons/io";
import {host} from '../../globals'

export default function LogsTab() {
    const cookies = new Cookies()

    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    async function GetLogs() {
        setIsLoading(true);
        const response = await fetch(`http://${host}/log/get_logs`, {
          headers: {
            "Authorization": `Bearer ${cookies.get('auth')}`
          }
        });
        const log = await response.json();
        setLogs(log);
        setIsLoading(false);
    }

    useEffect(() => {
        GetLogs();
		if (cookies.get('auth') != undefined) {
			if (Number((Date.now() / 1000).toFixed(0)) > jwtDecode(cookies.get('auth')).exp) {
				cookies.remove('auth', { path: '/' })
				window.location.reload()
			}
	}
    }, []);

    return (
        <section className={classes.logsection}>
            <div className={classes.logstab_card}>
                <div className={classes.logstab_card_etc}>
                    <button className={classes.logstab_button} onClick={() => console.log(refresh)}>Очистить логи</button>
                    {
                    cookies.get('auth') == undefined ? <p className={classes.logstab_tabletext}>Требуется авторизация</p> : <></>
                    }
                    <button className={classes.logstab_refreshbtn}><IoMdRefresh className={classes.logstab_icon} onClick={() => window.location.reload()}/></button>
                    
                </div>
                {cookies.get('auth') != undefined ? 
			<table>
				<thead>
				<tr>
					<th scope="col" id='fscol'>Компьютер</th>
					<th scope="col" id='sscol'>Время</th>
					<th scope="col" id='tscol'>Событие</th>
                    <th scope="col" id='ftscol'>Пользователь</th>
				</tr>
				</thead>
				<tbody>
				{!isLoading ? logs.map((log, i) => (
					<LogTableElement
                    id={i.time}
					comp_id={log.id} 
					time={log.time}
                    event={log.event} 
					username={log.username}
					/>
				)) : (
					<LogTableElement 
					comp_id={"Loading..."} 
					time={"Loading..."}
                    event={"Loading..."} 
					username={"Loading..."}
					/>
				)}
				</tbody>
			</table>
			:
			<></>
			}
          </div>
        </section>
    )
}