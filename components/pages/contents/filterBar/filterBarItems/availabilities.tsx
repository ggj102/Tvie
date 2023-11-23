import { Control, Controller, useWatch } from "react-hook-form";

import CustomCheckbox from "@/components/common/customCheckbox";

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
            <CustomCheckbox
              id="all_availabilities"
              text="Search all availabilities?"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {!isAllAvailabilities && (
          <div className={availabilitiesStyles.hideOption}>
            <Controller
              name="availabilities.stream"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="Stream"
                  text="Stream"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="availabilities.free"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="free"
                  text="Free"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="availabilities.ads"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="Ads"
                  text="Ads"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="availabilities.rent"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="Rent"
                  text="Rent"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="availabilities.buy"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  id="buy"
                  text="Buy"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
