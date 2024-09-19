import classes from './PanelTab.module.css';
import { useEffect, useState } from 'react';
import UserTableElement from '../UserTableElement/UserTableElement';
import { host } from '../../globals';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function PanelTab() {
	const cookies = new Cookies;
    const [users, setUsers] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function saveToLocalStorage(data) {
        localStorage.setItem('usersList', JSON.stringify(data));
    }


    function loadFromLocalStorage() {
        const savedUsersList = localStorage.getItem('usersList');
        return savedUsersList ? JSON.parse(savedUsersList) : null;
    }

    async function GetUsers() {
        setIsLoading(true);
        const response = await fetch(`http://${host}/websockets/fake_connections`);
        const users = await response.json();
        setUsers(users);


        const savedUsersList = loadFromLocalStorage();
        if (savedUsersList) {

            const updatedUsersList = users.map(user => {
                const existingUser = savedUsersList.find(item => item[user.id] !== undefined);
                return existingUser ? existingUser : { [user.id]: false }; 
            });
            setUsersList(updatedUsersList);
            saveToLocalStorage(updatedUsersList);
        } else {

            const initialUsersList = users.map(user => ({ [user.id]: false }));
            setUsersList(initialUsersList);
            saveToLocalStorage(initialUsersList);
        }

        setIsLoading(false);
    }

    function handleButton(user, i) {
        const updatedUsersList = [...usersList];
		console.log({
			'message': updatedUsersList[i][user.id] ? 1 : 2,
			'user_id': user.id
		  })
		axios.post(`http://${host}/websockets/send_personal_message`, {
			'message': updatedUsersList[i][user.id] ? 1 : 2,
			'user_id': user.id
		  }, {
			headers: {
			  "Authorization": `Bearer ${cookies.get('auth')}`
			}
		  })
		  
        updatedUsersList[i][user.id] = !updatedUsersList[i][user.id];
        setUsersList(updatedUsersList);
        saveToLocalStorage(updatedUsersList);
    }

    useEffect(() => {
        GetUsers();
		if (cookies.get('auth') != undefined) {
			if (Number((Date.now() / 1000).toFixed(0)) > jwtDecode(cookies.get('auth')).exp) {
				cookies.remove('auth', { path: '/' })
				window.location.reload()
			}
	}
    }, []);

    return (
      <section className={classes.paneltab}>
        <div className={classes.paneltab_card}>
          <div className={classes.paneltab_card_etc}>
              <button className={classes.paneltab_button}>Запретить вход</button>
          </div>
          {cookies.get('auth') != undefined ? 
			<table>
				<thead>
				<tr>
					<th scope="col" id='fcol'>Компьютер</th>
					<th scope="col" id='scol'>Пользователь</th>
					<th scope="col" id='tcol'>Баннер</th>
				</tr>
				</thead>
				<tbody>
				{!isLoading ? users.map((user, i) => (
					<UserTableElement 
					key={user.id} 
					computer_id={user.id} 
					user={user.name} 
					state={usersList[i] ? usersList[i][user.id] : false}
					onClick={() => handleButton(user, i)}
					/>
				)) : (
					<UserTableElement computer_id={'Loading...'} user={'Loading...'} state={false} />
				)}
				</tbody>
			</table>
			:
			<p className={classes.paneltab_tabletext}>Требуется авторизация</p>
			}
        </div>
      </section>
    );
}
