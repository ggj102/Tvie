import { forwardRef, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import customSliderStyles from "@styles/common/customSlider.module.scss";

const CustomSlider = forwardRef<
  HTMLDivElement,
  {
    max: number;
    step: number;
    pointNum: number;
  }
>(({ max, step, pointNum, ...props }, ref) => {
  const [graduationArr, setGraduationArr] = useState<number[]>([]);

  useEffect(() => {
    const gArr = [];
    for (let i = 0; i <= max; i += step) {
      gArr.push(i);
    }

    setGraduationArr(gArr);
  }, []);

  return (
    <div className={customSliderStyles.custom_slider}>
      <div className={customSliderStyles.graduation}>
        {graduationArr.map((val: number, idx: number) => {
          const isPoint = val % pointNum === 0;

          return (
            <div
              key={`${val}${idx}`}
              className={isPoint ? customSliderStyles.point_graduation : ""}
            >
              {isPoint && (
                <div className={customSliderStyles.point_num}>{val}</div>
              )}
            </div>
          );
        })}
      </div>
      <Slider
        ref={ref}
        min={0}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        {...props}
      />
    </div>
  );
});

CustomSlider.displayName = "CustomSlider";

export default CustomSlider;
