"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import { apiClient } from "@/lib/api/httpClient";
import { favoitesList } from "@/lib/api/authZero";

export default function useHistoryList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listData, setListData] = useState<any>([]);

  const onClickEmptyList = () => {
    const isConfirmed = confirm(`목록이 전부 삭제 됩니다.\n진행 하시겠습니까?`);

    if (isConfirmed) {
      localStorage.removeItem("historyData");
      setListData([]);
    }
  };

  useEffect(() => {
    if (listData.length > 0) return;

    const historyData = localStorage.getItem("historyData");
    if (!historyData) {
      setIsLoading(false);
      return;
    }

    const getData = JSON.parse(historyData);

    const requests = getData.map((val: any) => {
      const query =
        val.type === "person"
          ? "append_to_response=combined_credits&language=ko"
          : "language=ko";

      const path = `${val.type}/${val.id}?${query}`;

      return apiClient
        .get(path)
        .then((res) => {
          return { ...res.data, type: val.type };
        })
        .catch((error) => {
          throw error;
        });
    });

    Promise.all(requests)
      .then(async (res) => {
        axios.get("/api/users/favorites").then((user) => {
          if (user.data === "Unauthorized") {
            setListData(res);
          } else {
            const addData = favoitesList(user.data, res);
            setListData(addData);
          }

          setIsLoading(false);
        });
      })
      .catch((error) => {
        throw error;
      });
  }, [listData]);

  return { isLoading, listData, onClickEmptyList };
}
