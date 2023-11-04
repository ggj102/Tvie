import { useState } from "react";
import CustomCheckBox from "@/components/customCheckBox";
import { ReleaseDatesWrapper } from "@/styles/components/sideBar/sideBarCardContents/releaseDatesWrapper";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventIcon from "@mui/icons-material/Event";

export default function ReleaseDates() {
  const [isAllRelease, setIsAllRelease] = useState<boolean>(false);
  const [isAllCountries, setIsAllCountries] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const onChangeAllRelease = (e: any) => {
    setIsAllRelease(e.target.checked);
  };

  const onChangeCountries = (e: any) => {
    setIsAllCountries(e.target.checked);
  };

  return (
    <div className="cardContent">
      <div>Release Dates</div>
      <ReleaseDatesWrapper>
        <CustomCheckBox
          text="Search all releases?"
          onChange={onChangeAllRelease}
          checked={isAllRelease}
        />
        {!isAllRelease && (
          <div className="hideCheckbox">
            <CustomCheckBox
              id="allCountries"
              text="Search all countries?"
              onChange={onChangeCountries}
              checked={isAllCountries}
            />
            {!isAllCountries && <>셀렉트박스</>}
            <CustomCheckBox text="극장 (제한)" />
            <CustomCheckBox text="극장" />
            <CustomCheckBox text="프리미어" />
            <CustomCheckBox text="물리매체" />
            <CustomCheckBox text="TV" />
          </div>
        )}
        <div className="datepickerWrapper">
          <div>
            <span>from</span>
            <ReactDatePicker
              showIcon
              dateFormat="yyyy.MM.dd" // 날짜 형태
              // shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              // minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
              // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
              // open={true}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              icon={<EventIcon />}
            />
          </div>
          <div>
            <span>to</span>
            <ReactDatePicker
              showIcon
              dateFormat="yyyy.MM.dd" // 날짜 형태
              // shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              // minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
              // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
              // open={true}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              icon={<EventIcon />}
            />
          </div>
        </div>
      </ReleaseDatesWrapper>
    </div>
  );
}
