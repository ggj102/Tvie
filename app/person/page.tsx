"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";

import { apiClient } from "@/api/httpClient";
import ContentLayout from "@/components/contentLayout";
import { Pagination } from "@mui/material";
import { PersonDetailDataType } from "../personDetail/page";
import CustomImage from "@/components/customImage";

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
    apiClient.get("person/popular?language=ko&page=1").then((res) => {
      console.log(res.data.results);
      setPersonData(res.data.results);
      setTotalPages(res.data.total_pages);
    });
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 인물</div>
      <div className="personList">
        {personData.map((val: PersonDataType) => {
          const { id, name, known_for, profile_path } = val;
          return (
            <div key={id} className="personCard">
              <Link href={`/personDetail?id=${id}`}>
                <CustomImage
                  className="personImg"
                  type="person"
                  src={`https://image.tmdb.org/t/p/w235_and_h235_face/${profile_path}`}
                />
              </Link>
              <div className="personInfo">
                <Link href={`/personDetail?id=${id}`} className="name">
                  {name}
                </Link>
                <div className="sub">
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
      <div className="pagination">
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
    </ContentLayout>
  );
}
