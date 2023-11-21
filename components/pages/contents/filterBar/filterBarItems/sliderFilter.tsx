import { Controller } from "react-hook-form";

import CustomSlider from "@/components/common/customSlider";
import filterBarCardStyles from "@styles/pages/contents/filterBar/filterBarCard.module.scss";

export default function SliderFilter({ control }: { control: any }) {
  return (
    <>
      <div className={filterBarCardStyles.card_item}>
        <div>User Score</div>
        <div className={filterBarCardStyles.slider}>
          <Controller
            name="vote_average"
            control={control}
            render={({ field }) => (
              <CustomSlider max={10} step={1} pointNum={5} {...field} />
            )}
          />
        </div>
      </div>
      <div className={filterBarCardStyles.card_item}>
        <div>Minimum User Votes</div>
        <div className={filterBarCardStyles.slider}>
          <Controller
            name="vote_count"
            control={control}
            render={({ field }) => (
              <CustomSlider max={500} step={50} pointNum={100} {...field} />
            )}
          />
        </div>
      </div>
      <div className={filterBarCardStyles.card_item}>
        <div>Runtime</div>
        <div className={filterBarCardStyles.slider}>
          <Controller
            name="runtime"
            control={control}
            render={({ field }) => (
              <CustomSlider max={400} step={15} pointNum={120} {...field} />
            )}
          />
        </div>
      </div>
    </>
  );
}
