import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { CustomSliderWrapper } from "@/styles/components/customSliderWrapper";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function CustomSlider({
  max,
  step,
  pointNum,
  sliderValue,
  onChange,
}: {
  max: number;
  step: number;
  pointNum: number;
  sliderValue: number | number[];
  onChange: any;
}) {
  const [graduationArr, setGraduationArr] = useState<number[]>([]);

  useEffect(() => {
    const gArr = [];
    for (let i = 0; i <= max; i += step) {
      gArr.push(i);
    }

    setGraduationArr(gArr);
  }, []);

  return (
    <CustomSliderWrapper>
      <div className="graduation">
        {graduationArr.map((val: number, idx: number) => {
          const isPoint = val % pointNum === 0;

          return (
            <div
              key={`${val}${idx}`}
              className={isPoint ? "pointGraduation" : ""}
            >
              {isPoint && <div className="pointNum">{val}</div>}
            </div>
          );
        })}
      </div>
      <Slider
        value={sliderValue}
        min={0}
        max={max}
        step={step}
        onChange={onChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </CustomSliderWrapper>
  );
}
