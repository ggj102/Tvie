"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";

import { GlobalContext } from "../context";
import { apiClient } from "@/api/httpClient";

import { Pagination } from "@mui/material";
import { PersonDetailDataType } from "../personDetail/page";
import CustomImage from "@/components/common/customImage";

import personStyles from "@styles/pages/person/person.module.scss";

export type PersonDataType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: PersonDetailDataType[];
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
};

export default function PersonPage() {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const [personData, setPersonData] = useState<PersonDataType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePagination = (e: ChangeEvent<unknown>, page: number) => {
    apiClient.get(`person/popular?language=ko&page=${page}`).then((res) => {
      setPersonData(res.data.results);
      setCurrentPage(page);

      window.scrollTo({ top: 0 });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    apiClient.get("person/popular?language=ko&page=1").then((res) => {
      setPersonData(res.data.results);
      setTotalPages(res.data.total_pages);
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <>
        <div className={personStyles.person_title}>인기 인물</div>
        <div className={personStyles.person_list}>
          {personData.map((val: PersonDataType) => {
            const { id, name, known_for, profile_path } = val;
            return (
              <div key={id} className={personStyles.person_card}>
                <Link href={`/personDetail?id=${id}`}>
                  <CustomImage
                    className={personStyles.image}
                    type="person"
                    src={`https://image.tmdb.org/t/p/w235_and_h235_face/${profile_path}`}
                  />
                </Link>
                <div className={personStyles.person_info}>
                  <Link
                    href={`/personDetail?id=${id}`}
                    className={personStyles.person_name}
                  >
                    {name}
                  </Link>
                  <div className={personStyles.person_text}>
                    {known_for.map(
                      (
                        val: PersonDetailDataType,
                        idx: number,
                        arr: PersonDetailDataType[]
                      ) => {
                        const title = val.title ? val.title : val.name;

                        return `${title}${idx !== arr.length - 1 ? ", " : ""}`;
                      }
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
      </>
    )
  );
}
