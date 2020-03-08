import styled from "styled-components";

export default styled.p`
  font-family: BadaBoom;
  font-size: 4vh;
  color: rgba(255, 255, 255, ${props => (props.selected ? "1" : "0.5")});
  margin: 0;
  text-shadow: 0 0 4px #000;
`;
