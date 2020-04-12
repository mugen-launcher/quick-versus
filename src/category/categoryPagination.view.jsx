import React from "react";
import styled from "styled-components";

const Pagination = styled.p`
  margin: 0;
  font-family: Ubuntu;
  font-size: 2vh;
  color: #fff;
  text-shadow: 0 0 2px #000;
`;

export default function CategoryPagination({ index, total }) {
  return (
    <Pagination>
      {index}/{total}
    </Pagination>
  );
}
