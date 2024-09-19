import axios from 'axios';

export default async function GetUsers() {
    await axios
        .get('http://192.168.31.92:8000/websockets/fake_connections')
        .then(
            (response) => {
                return response.data;
            }
        )
}