import { Control, Controller, useWatch } from "react-hook-form";

import CustomCheckBox from "@/components/common/customCheckBox";
import { DiscoverDataType } from "@/components/pages/contents/contents";

import filterBarCardStyles from "@styles/pages/contents/filterBar/filterBarCard.module.scss";
import availabilitiesStyles from "@styles/pages/contents/filterBar/filterItems/availabilities.module.scss";

export default function Availabilities({
  control,
}: {
  control: Control<DiscoverDataType>;
}) {
  const isAllAvailabilities = useWatch({
    control,
    name: "availabilities.all_availabilities",
  });

  return (
    <div className={filterBarCardStyles.card_item}>
      <div>Availabilities</div>
      <div className={availabilitiesStyles.availabilities}>
        <Controller
          name="availabilities.all_availabilities"
          control={control}
          render={({ field }) => (
            <CustomCheckBox
              text="Search all availabilities?"
              checked={field.value}
              {...field}
            />
          )}
        />
        {!isAllAvailabilities && (
          <div className={availabilitiesStyles.hideOption}>
            <Controller
              name="availabilities.stream"
              control={control}
              render={({ field }) => (
                <CustomCheckBox
                  text="Stream"
                  checked={field.value}
                  {...field}
                />
              )}
            />
            <Controller
              name="availabilities.free"
              control={control}
              render={({ field }) => (
                <CustomCheckBox text="Free" checked={field.value} {...field} />
              )}
            />
            <Controller
              name="availabilities.ads"
              control={control}
              render={({ field }) => (
                <CustomCheckBox text="Ads" checked={field.value} {...field} />
              )}
            />
            <Controller
              name="availabilities.rent"
              control={control}
              render={({ field }) => (
                <CustomCheckBox text="Rent" checked={field.value} {...field} />
              )}
            />
            <Controller
              name="availabilities.buy"
              control={control}
              render={({ field }) => (
                <CustomCheckBox text="Buy" checked={field.value} {...field} />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
