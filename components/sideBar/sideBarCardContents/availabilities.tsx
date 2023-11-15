import { Control, Controller, FieldValues, useWatch } from "react-hook-form";

import CustomCheckBox from "@/components/customCheckBox";
import { AvailabilitiesWrapper } from "@/styles/components/sideBar/sideBarCardContents/availabilitiesWrapper";
import { DiscoverDataType } from "@/components/contentList";

export default function Availabilities({
  control,
}: {
  control: Control<DiscoverDataType, any>;
}) {
  const isAllAvailabilities = useWatch({
    control,
    name: "availabilities.all_availabilities",
  });

  return (
    <div className="cardContent">
      <div>Availabilities</div>
      <AvailabilitiesWrapper>
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
          <div className="hideOption">
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
      </AvailabilitiesWrapper>
    </div>
  );
}
