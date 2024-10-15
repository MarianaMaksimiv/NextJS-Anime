"use client";

import { PageInfo } from "@/types";
import { Button, Flex } from "@chakra-ui/react";
import {useRouter, useSearchParams} from "next/navigation";
import { useMemo } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  pageInfo: PageInfo;
};

// Function to generate range of numbers for pagination from start to end (inclusive).
// Used to generate numbers for displaying page numbers in the pagination component.
function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

// Function to prepare an array of page numbers including ellipsis '...' if necessary, based on current page and total pages.
function pagination(currentPage: number, totalPages: number) {
  // Calculate the left and right sibling page numbers based on the current page.
  const leftSiblingIndex = Math.max(currentPage - 1, 1);
  const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Implementing logic to decide where to show ellipsis
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3;
    const leftRange = range(firstPageIndex, firstPageIndex + leftItemCount);
    return [...leftRange, '...', lastPageIndex];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3;
    const rightRange = range(lastPageIndex - rightItemCount, lastPageIndex);
    return [firstPageIndex, '...', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }

  // No ellipsis case, show all page numbers
  return range(firstPageIndex, lastPageIndex);
}

// Pagination component
export default function Pagination({ pageInfo }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const MAX_PAGES = 100; // Maximum number of pages in pagination

  // Generating an array of page numbers for current page out of total pages
  const paginationNumbers = useMemo(
      () => pagination(pageInfo.currentPage, MAX_PAGES),
      [pageInfo.currentPage]
  );

  // Handlers to change current page. Change URL and refresh.
  const handlePageChange = (pageNum: number) => {
    router.push(`/information-page?page=${pageNum}&per_page=${pageInfo.perPage}`);
    router.refresh();
  };

  const handlePrevPage = () => pageInfo.currentPage > 1 && handlePageChange(pageInfo.currentPage - 1);
  const handleNextPage = () => pageInfo.currentPage < MAX_PAGES && handlePageChange(pageInfo.currentPage + 1);

  return (
      <div>
        {pageInfo.total > 0 && (
            <Flex justifyContent="center" gap={2}>
              {/* Arrow button to navigate to previous page */}
              <Button onClick={handlePrevPage} size="xs" disabled={pageInfo.currentPage === 1}><FaChevronLeft /></Button>

              {/* Numerical page buttons and ellipsis */}
              <Flex gap={1} flexWrap="wrap">
                {paginationNumbers.map((number, idx) => {
                  return (
                      <Button
                          key={idx}
                          size="xs"
                          variant="unstyled"
                          onClick={() => number !== "..." && handlePageChange(number as number)}
                          border="1px solid transparent"
                          borderColor={
                            search && +search === number ? "blue.400" : "transparent"
                          }
                      >
                        {number}
                      </Button>
                  );
                })}
              </Flex>

              {/* Arrow button to navigate to next page */}
              <Button onClick={handleNextPage} size="xs" disabled={pageInfo.currentPage === MAX_PAGES}><FaChevronRight /></Button>
            </Flex>
        )}
      </div>
  );
}
