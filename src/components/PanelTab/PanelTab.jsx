import classes from './PanelTab.module.css';
import { useState } from 'react';
import UserTableElement from '../UserTableElement/UserTableElement';

export default function PanelTab() {
    const [currentTime, setCurrentTime] = useState(() => new Date());
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
  <caption>
    Front-end web developer course 2021
  </caption>
  <thead>
    <tr>
      <th scope="col" id='fcol'>Person</th>
      <th scope="col" id='scol'>Most interest in</th>
      <th scope="col" id='tcol'>Age</th>
    </tr>
  </thead>
  <tbody>
  <UserTableElement computer_id={'1'} user={'user1'} />
    <tr>
      <th scope="row">Dennis</th>
      <td>Web accessibility</td>
      <td>45</td>
    </tr>
    <tr>
      <th scope="row">Sarah</th>
      <td>JavaScript frameworks</td>
      <td>29</td>
    </tr>
    <tr>
      <th scope="row">Karen</th>
      <td>Web performance</td>
      <td>36</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colSpan="2">Average age</th>
      <td>33</td>
    </tr>
  </tfoot>
</table>

      </div>
    </section>
  );

}