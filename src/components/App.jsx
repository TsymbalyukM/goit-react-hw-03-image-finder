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

  getLargeImgUrl = imgUrl => {
    this.setState({ largeImageUrl: imgUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  searchResult = value => {
    this.setState({ query: value, page: 1, pictures: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.addPictures(this.state.query, this.state.page);
    }
  }

  addPictures = async (query, page) => {
    try {
      this.setState(() => ({ isLoading: true }));

      const { hits } = await fetchPictures(query, page);

      if (page === 1) {
        this.setState(() => ({ pictures: hits }));
      } else {
        this.setState(state => ({
          pictures: [...state.pictures, ...hits],
        }));
      }
    } catch (error) {
      this.setState(() => ({ error: error.message }));
    } finally {
      this.setState(() => ({ isLoading: false }));
    }
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
