import { usePathname } from "next/navigation";
import { Control, Controller, FieldValues, useWatch } from "react-hook-form";
import ReleaseDatePicker from "./releaseDatePicker";

import CustomCheckBox from "@/components/common/customCheckBox";
import { ReleaseDatesWrapper } from "@/styles/components/sideBar/sideBarCardContents/releaseDatesWrapper";
import { DiscoverDataType } from "@/components/pages/contents/contentList";

export default function ReleaseDates({
  control,
}: {
  control: Control<DiscoverDataType, any>;
}) {
  const pathname = usePathname();

  const isAllEpisodes = useWatch({ control, name: "release.all_episodes" });
  const isAllRelease = useWatch({ control, name: "release.all_releases" });
  // const isAllCountries = useWatch({ control, name: "release.all_countries" });

  return (
    <div className="cardContent">
      <div>{pathname === "/tv" ? "방영일자" : "Release Dates"}</div>
      <ReleaseDatesWrapper>
        {pathname === "/tv" ? (
          <div>
            <Controller
              name="release.all_episodes"
              control={control}
              render={({ field }) => (
                <CustomCheckBox
                  text="Search all episodes?"
                  checked={field.value}
                  {...field}
                />
              )}
            />
            {!isAllEpisodes && (
              <div className="hideCheckbox">
                <Controller
                  name="release.first_air_date"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="Search first air date?"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <Controller
              name="release.all_releases"
              control={control}
              render={({ field }) => (
                <CustomCheckBox
                  text="Search all releases?"
                  checked={field.value}
                  {...field}
                />
              )}
            />
            {!isAllRelease && (
              <div className="hideCheckbox">
                {/* <Controller
                  name="release.all_countries"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      id="allCountries"
                      text="Search all countries?"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
                {!isAllCountries && <>셀렉트박스</>} */}
                <Controller
                  name="release.theater_limited"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="극장 (제한)"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="release.theater"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="극장"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="release.premier"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="프리미어"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="release.digital"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="디지털"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="release.physical_media"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="물리매체"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="release.tv"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckBox
                      text="TV"
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
          </div>
        )}
        <ReleaseDatePicker control={control} />
      </ReleaseDatesWrapper>
    </div>
  );
}
