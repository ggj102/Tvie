import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { CustomSliderWrapper } from "@/styles/components/customSliderWrapper";

export default function CustomSlider({
  max,
  step,
  pointNum,
  ...props
}: {
  max: number;
  step: number;
  pointNum: number;
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
        min={0}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        {...props}
      />
    </CustomSliderWrapper>
  );
}