"use client";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  page,
  setPage,
}) => {
  // Setting start and end index
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(totalPages > 3 ? 3 : totalPages);

  const shiftLeft = () => {
    if (start > 1) {
      setStart(start - 1);
      setEnd(end - 1);
    }
  };

  const shiftRight = () => {
    if (end < totalPages) {
      setStart(start + 1);
      setEnd(end + 1);
    }
  };

  //Fill up pagination list
  const [paginationList, setPaginationList] = useState<number[]>(
    Array.from({ length: end - start + 1 }, (_, index) => index + start)
  );

  useEffect(() => {
    const array = [];
    for (let num = start; num <= end; num++) {
      array.push(num);
    }
    setPaginationList(array);
  }, [start, end]);

  useEffect(() => {
    setEnd(totalPages > 3 ? 3 : totalPages);
  }, [totalPages]);

  return (
    <div className="flex gap-x-4">
      <button
        className={`flex items-center justify-center text-black hover:bg-blue1 hover:text-white rounded-md w-8 h-8 ${
          start == 1 ? "invisible" : ""
        }`}
        onClick={() => shiftLeft()}
      >
        <BsChevronLeft />
      </button>
      {paginationList.map((item, index) => (
        <button
          key={index}
          className={`flex items-center justify-center rounded-md w-8 h-8 hover:bg-blue1 hover:text-white ${
            page == item ? "bg-blue2 text-white" : "text-black"
          }`}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}

      <button
        className={`flex items-center justify-center text-black hover:bg-blue1 hover:text-white rounded-md w-8 h-8 ${
          end == totalPages ? "invisible" : ""
        }`}
        onClick={() => shiftRight()}
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

export default Pagination;