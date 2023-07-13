import { React, Component } from 'react';
import { fetchPictures } from './API/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import { Wrapper } from './Searchbar/Searchbar.styled';
import GlobalStyle from './styles';

export class App extends Component {
  state = {
    pictures: [],
    showModal: false,
    largeImageUrl: '',
    page: 1,
    query: '',
    error: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.addPictures(query, page);
    }
  }

  searchResult = value => {
    this.setState({ query: value, page: 1, pictures: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  addPictures = async (query, page) => {
    try {
      this.setState({ isLoading: true });

      const { hits } = await fetchPictures(query, page);

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  getLargeImgUrl = imgUrl => {
    this.setState({ largeImageUrl: imgUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { pictures, error, isLoading, showModal, largeImageUrl } = this.state;
    const loadMoreButton = pictures.length > 0 && !isLoading;
    return (
      <Wrapper>
        <GlobalStyle />
        <Searchbar onSubmit={this.searchResult} />
        {showModal && (
          <Modal imgUrl={largeImageUrl} onClose={this.toggleModal} />
        )}
        <ImageGallery
          error={error}
          isLoading={isLoading}
          pictures={pictures}
          onClick={this.getLargeImgUrl}
        />
        {loadMoreButton && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </Wrapper>
    );
  }
}
