import classes from './PanelTab.module.css';
import { useEffect, useState } from 'react';
import UserTableElement from '../UserTableElement/UserTableElement';
import axios from 'axios';

export default function PanelTab() {
    const [currentTime, setCurrentTime] = useState(() => new Date());
    const [state, setState] = useState(true);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function GetUsers() {
      // await axios
      //     .get('http://192.168.31.92:8000/websockets/fake_connections')
      //     .then(
      //         (response) => {
      //             setUsers(response.data)
      //         }
      //     )
      setIsLoading(true);
      const response = await fetch('http://192.168.31.92:8000/websockets/fake_connections')

      const users = await response.json();
      setUsers(users)
      setIsLoading(false);
  }

    useEffect(() => {
      GetUsers()
    }, []);
    setInterval(() => {setCurrentTime(new Date())}, 1000);
    return (
    <section className={classes.paneltab}>
      <div className={classes.paneltab_card}>
        <div className={classes.paneltab_card_etc}>
            <button className={classes.paneltab_button}>Запретить вход</button>
            <div className={classes.paneltab_timetab}>
                <p className={classes.paneltab_time}>{currentTime.toLocaleDateString()}</p>
                <p className={classes.paneltab_time}>{currentTime.toLocaleTimeString()}</p>
            </div>
        </div>
        <table>
  <thead>
    <tr>
      <th scope="col" id='fcol'>Компьютер</th>
      <th scope="col" id='scol'>Пользователь</th>
      <th scope="col" id='tcol'>Баннер</th>
    </tr>
  </thead>
  <tbody>
  {!isLoading ? users.map(user => {
    <UserTableElement computer_id={user.id} user={user.name} state={state} onClick={setState}/>
  }): <UserTableElement computer_id={'Loading...'} user={'Loading...'} state={state} onClick={setState} />}
  </tbody>
</table>

      </div>
    </section>
  );

}