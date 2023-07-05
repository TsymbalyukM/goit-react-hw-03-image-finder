import { Component } from 'react';
import * as API from './API/Api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchName: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }
  // Метод для завантаження додаткових зображень
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  //Метод відправки форми
  handleSubmit = query => {
    this.setState({
      searchName: query,
      images: [], // Очищення масиву зображень
      currentPage: 1, // Скидаємо номер сторінки на початкову
    });
  };
  // Метод для додавання і отримання зображень
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      // Отримуємо дані через API запит
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // Повідомлення якщо немає зображення
        return toast.info('Sorry image not found...', {
          // position: toast.POSITION.TOP_RIGHT,
        });
      }

      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], // Додає нові зображення до існуючих
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12), // Загальна кількість сторінок
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); // Повідомлення при помилці
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty... 📷
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
