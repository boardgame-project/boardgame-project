import styled from '@emotion/styled';

const Rating = styled.div`
  display: inline-block;
  font-size: 60px;
  font-family: Times;
  line-height: 1;
  content: ⬢⬢⬢⬢⬢;
  letter-spacing: 3px;
  background: linear-gradient(
      90deg,
      60px ${(props: { rating: number }) => (props.rating / 5) * 100}%,
      black ${(props: { rating: number }) => (props.rating / 5) * 100}%
    )
    %;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default Rating;
