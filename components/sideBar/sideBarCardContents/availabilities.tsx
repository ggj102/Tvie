import { Controller, useWatch } from "react-hook-form";

import CustomCheckBox from "@/components/customCheckBox";
import { AvailabilitiesWrapper } from "@/styles/components/sideBar/sideBarCardContents/availabilitiesWrapper";

export default function Availabilities({ control }: any) {
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
          render={({ field }: any) => (
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
              render={({ field }: any) => (
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
              render={({ field }: any) => (
                <CustomCheckBox text="Free" checked={field.value} {...field} />
              )}
            />
            <Controller
              name="availabilities.ads"
              control={control}
              render={({ field }: any) => (
                <CustomCheckBox text="Ads" checked={field.value} {...field} />
              )}
            />
            <Controller
              name="availabilities.rent"
              control={control}
              render={({ field }: any) => (
                <CustomCheckBox text="Rent" checked={field.value} {...field} />
              )}
            />
            <Controller
              name="availabilities.buy"
              control={control}
              render={({ field }: any) => (
                <CustomCheckBox text="Buy" checked={field.value} {...field} />
              )}
            />
          </div>
        )}
      </AvailabilitiesWrapper>
    </div>
  );
}
