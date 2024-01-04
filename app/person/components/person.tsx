"use client";

import { Pagination } from "@mui/material";
import usePerson from "./usePerson";

import PersonList from "./personList";

import personStyles from "@styles/pages/person/person.module.scss";

export default function Person({
  isSession,
  list,
  totalPages,
}: {
  isSession: boolean;
  list: PersonDataType[];
  totalPages: number;
}) {
  const { personData, currentPage, onChangePagination } = usePerson(list);

  return (
    <div className={personStyles.person}>
      <div className={personStyles.person_title}>인기 인물</div>
      <PersonList isSession={isSession} personData={personData} />
      <div className={personStyles.person_pagination}>
        <Pagination
          count={totalPages}
          page={currentPage}
          defaultPage={1}
          boundaryCount={2}
          siblingCount={3}
          hidePrevButton={currentPage === 1}
          hideNextButton={currentPage === totalPages}
          onChange={onChangePagination}
        />
      </div>
    </div>
  );
}
