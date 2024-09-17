import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Auth(login, password) {
    const cookies = new Cookies();
        axios
        .post('http://212.193.27.248:8000/auth/cookie', {
             'username':login,
             'password':password
            })
        .then(response => {
            cookies.set('auth', response.data['access_token'], { path: '/' });
            window.location.reload();
        })
}