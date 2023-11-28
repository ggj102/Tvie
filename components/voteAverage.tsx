"use client";

import voteAverageStyles from "@styles/common/voteAverage.module.scss";
import React, { useEffect, useState } from "react";

interface VoteDataType {
  vote_average: string;
  deg: string;
  color: string;
}

export default function VoteAverage({
  vote,
  size,
  font,
  top,
  left,
}: {
  vote?: number;
  size: number;
  font?: number;
  top: number;
  left: number;
}) {
  const [voteData, setVoteData] = useState<VoteDataType>({
    vote_average: "NR",
    deg: "0deg",
    color: "#8b8b8b",
  });

  useEffect(() => {
    if (!vote) return;

    const vote_average = Math.floor(vote * 10);
    const deg = `${vote_average * 3.6}deg`;
    let color = "";

    if (vote_average < 40) {
      color = "#D4235E";
    } else if (vote_average > 70) {
      color = "#3FD58A";
    } else {
      color = "#C7CA2F";
    }

    setVoteData({ ...voteData, vote_average: `${vote_average}`, deg, color });
  }, []);

  return (
    <div
      className={voteAverageStyles.vote_average}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div>
        <div
          className={voteAverageStyles.average_bg_sub}
          style={{ backgroundColor: voteData.color }}
        ></div>
        <figure>
          <div
            className={voteAverageStyles.average_bg_main}
            style={
              {
                "--deg": voteData.deg,
                "--fgcolor": voteData.color,
              } as React.CSSProperties
            }
          >
            <span style={{ fontSize: `${font}px` }}>
              {voteData.vote_average}
              {voteData.vote_average !== "NR" && <span>%</span>}
            </span>
          </div>
        </figure>
      </div>
    </div>
  );
}
