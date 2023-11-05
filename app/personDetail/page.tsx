"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PersonDetailWrapper } from "@/styles/pages/personDetailWrapper";

export default function PersonDetailPage() {
  const [dummyData, setDummyData] = useState<any>([]);

  useEffect(() => {
    const dummy = {
      title: "스파이더맨: 파 프롬 홈",
      image: "/images/testContentImg6.jpg",
    };

    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(dummy);
    }

    setDummyData(arr);
  }, []);

  return (
    <PersonDetailWrapper>
      <div>
        <div className="personInfo">
          <div className="personImg">
            <Image src="/images/testContentImg5.jpg" fill alt="personImg" />
          </div>
          <div className="info">
            <div>인물 정보</div>
            <div className="intro">
              <div>
                <p>유명 분야</p>
                <div>연기</div>
              </div>
              <div>
                <p>참여 작품 수</p>
                <div>301</div>
              </div>
              <div>
                <p>성별</p>
                <div>남성</div>
              </div>
              <div>
                <p>생일</p>
                <div>1948-12-21 (74 years old)</div>
              </div>
              <div>
                <p>출생지</p>
                <div>Washington, District of Columbia, USA</div>
              </div>
              <div>
                <p>다른 명칭</p>
                <ul>
                  <li>사무엘 L. 잭슨</li>
                  <li>Sam Jackson</li>
                  <li>Samuel Jackson</li>
                  <li>森姆·積遜</li>
                  <li>サミュエル・L・ジャクソン</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="detailInfo">
          <div className="personName">Samuel L. Jackson</div>
          <div className="history">
            <div className="detailInfoTitle">약력</div>
            <div className="historyText">
              <div>{`Samuel Leroy Jackson (born December 21, 1948) is an American actor and producer. One of the most widely recognized actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide, making him the second highest-grossing actor of all time. The Academy of Motion Picture Arts and Sciences gave him an Academy Honorary Award in 2022 as "A cultural icon whose dynamic work has resonated across genres and generations and audiences worldwide".`}</div>
              <div>{`Jackson started his career on stage making his professional theatre debut in Mother Courage and her Children in 1980 at The Public Theatre. From 1981 to 1983 he originated the role of Private Louis Henderson in A Soldier's Play Off-Broadway. He also originated the role of Boy Willie in August Wilson's The Piano Lesson in 1987 at the Yale Repertory Theatre. He returned to the play in the 2022 Broadway revival playing Doaker Charles. Jackson early film roles include Coming to America (1988), Goodfellas (1990), Patriot Games (1992), Juice (1992), True Romance (1993), and Jurassic Park (1993), Menace II Society (1993), and Fresh (1994). His collaborations with Spike Lee led to greater prominence with films such as School Daze (1988), Do the Right Thing (1989), Mo' Better Blues (1990), Jungle Fever (1991), Oldboy (2013), and Chi-Raq (2015).`}</div>
            </div>
          </div>
          <div className="famous">
            <div className="detailInfoTitle">유명 작품</div>
            <div className="famousList">
              <ul>
                {dummyData.map((val: any, idx: number) => {
                  const { title, image } = val;
                  return (
                    <li key={`${title}${idx}`}>
                      <div className="famousImg">
                        <Image src={image} fill alt="famousImg" />
                      </div>
                      <div className="famousTitle">{title}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="career">
            <div className="detailInfoTitle">연기</div>
            <div className="careerList">
              <ul>
                <li>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="career">
            <div className="detailInfoTitle">제작</div>
            <div className="careerList">
              <ul>
                <li>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="career">
            <div className="detailInfoTitle">창작자</div>
            <div className="careerList">
              <ul>
                <li>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div className="careerYear">2024</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>Unholy Trinity</div>
                      <div>St. Christopher 역</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PersonDetailWrapper>
  );
}
