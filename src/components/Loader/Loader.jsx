import { RotatingLines } from 'react-loader-spinner';
import { LodeWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LodeWrapper>
      <RotatingLines
        strokeColor="lightpink"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </LodeWrapper>
  );
};

export default Loader;
