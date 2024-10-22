import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Auth(login, password) {
    const cookies = new Cookies();

    const host = `${localStorage.getItem('ip')}:${localStorage.getItem('port')}`

        axios
        .post(`http://${host}/auth/token`, {
             'username':login,
             'password':password
            })
        .then(response => {
            cookies.set('auth', response.data['access_token'], { path: '/' });
            window.location.reload();
        })
}