import { Control, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import EventIcon from "@mui/icons-material/Event";

import "react-datepicker/dist/react-datepicker.css";
import { DiscoverDataType } from "@/components/contentList";

export default function ReleaseDatePicker({
  control,
}: {
  control: Control<DiscoverDataType>;
}) {
  return (
    <div className="datepickerWrapper">
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
