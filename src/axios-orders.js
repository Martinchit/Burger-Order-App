import axios from 'axios';

const Instance = axios.create({
    baseURL: 'https://burger-13a7d.firebaseio.com/'
});

export default Instance 