import axios from 'https://cdn.jsdelivr.net/npm/axios@1.11.0/+esm';

const response = await axios.get('http://localhost:3000/tasks');
console.log(response.data);