import { Control, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import EventIcon from "@mui/icons-material/Event";

import "react-datepicker/dist/react-datepicker.css";

import releaseDatesStyles from "@styles/pages/contents/filterBar/filterItems/releaseDates.module.scss";

export default function ReleaseDatePicker({
  control,
}: {
  control: Control<DiscoverDataType>;
}) {
  return (
    <div className={releaseDatesStyles.datepicker}>
      <div>
        <span>from</span>
        <Controller
          name="release_date_g"
          control={control}
          render={({ field }: any) => (
            <ReactDatePicker
              showIcon
              dateFormat="yyyy-MM-dd"
              selected={field.value || null}
              icon={<EventIcon />}
              autoComplete="off"
              {...field}
            />
          )}
        />
      </div>
      <div>
        <span>to</span>
        <Controller
          name="release_date_l"
          control={control}
          render={({ field }: any) => (
            <ReactDatePicker
              showIcon
              dateFormat="yyyy-MM-dd"
              selected={field.value}
              icon={<EventIcon />}
              autoComplete="off"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
