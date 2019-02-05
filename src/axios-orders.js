import axios from 'axios';

export default axios.create({
  baseURL: 'https://burger-builder-react-a10cd.firebaseio.com/'
});