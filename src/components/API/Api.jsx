import axios from 'axios';

export const fetchPictures = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const OPTIONS = `q=${query}&page=${page}&key=33347523-21eeb7913e8f8d453adb05c33&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`${BASE_URL}/?${OPTIONS}`);
  return response.data;
};
