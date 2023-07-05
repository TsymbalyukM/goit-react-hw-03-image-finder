import styled from '@emotion/styled';

export const ImageGalleryCard = styled.li`
  border-radius: 8px;
`;

export const GalleryCardImg = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
