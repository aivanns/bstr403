import axios from 'axios';
import Cookies from 'universal-cookie';
import {host} from '../../globals'

export default function Auth(login, password) {
    const cookies = new Cookies();
        axios
        .post(`http://${host}/auth/cookie`, {
             'username':login,
             'password':password
            })
        .then(response => {
            cookies.set('auth', response.data['access_token'], { path: '/' });
            window.location.reload();
        })
}