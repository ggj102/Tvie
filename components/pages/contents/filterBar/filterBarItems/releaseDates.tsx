import { usePathname } from "next/navigation";
import { Control, Controller, useWatch } from "react-hook-form";
import ReleaseDatePicker from "./releaseDatePicker";

import CustomCheckbox from "@/components/common/customCheckbox";

import filterBarCardStyles from "@styles/pages/contents/filterBar/filterBarCard.module.scss";
import releaseDatesStyles from "@styles/pages/contents/filterBar/filterItems/releaseDates.module.scss";

export default function ReleaseDates({
  control,
}: {
  control: Control<DiscoverDataType>;
}) {
  const pathname = usePathname();

  const isAllEpisodes = useWatch({ control, name: "release.all_episodes" });
  const isAllRelease = useWatch({ control, name: "release.all_releases" });
  // const isAllCountries = useWatch({ control, name: "release.all_countries" });

  return (
    <div className={filterBarCardStyles.card_item}>
      <div>{pathname === "/tv" ? "방영일자" : "Release Dates"}</div>

      {pathname === "/tv" ? (
        <div>
          <Controller
            name="release.all_episodes"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                id="all_episodes"
                text="Search all episodes?"
                checked={field.value}
                {...field}
              />
            )}
          />
          {!isAllEpisodes && (
            <div className={releaseDatesStyles.hide_checkbox}>
              <Controller
                name="release.first_air_date"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    id="first_air_date"
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
              <CustomCheckbox
                id="all_releases"
                text="Search all releases?"
                checked={field.value}
                {...field}
              />
            )}
          />
          {!isAllRelease && (
            <div className={releaseDatesStyles.hide_checkbox}>
              {/* <Controller
                  name="release.all_countries"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
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
                  <CustomCheckbox
                    id="theater_limited"
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
                  <CustomCheckbox
                    id="theater"
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
                  <CustomCheckbox
                    id="premier"
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
                  <CustomCheckbox
                    id="digital"
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
                  <CustomCheckbox
                    id="physical_media"
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
                  <CustomCheckbox
                    id="releaseTv"
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
    </div>
  );
}
