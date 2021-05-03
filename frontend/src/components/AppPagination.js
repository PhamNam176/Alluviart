import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AppPagination({ countPages, page, keyword = "" }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    countPages > 1 && (
      <Pagination>
        {[...Array(countPages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`/?keyword=${keyword}&page=${x + 1}`}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default AppPagination;
