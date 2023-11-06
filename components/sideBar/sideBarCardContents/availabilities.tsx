import CustomCheckBox from "@/components/customCheckBox";
import { AvailabilitiesWrapper } from "@/styles/components/sideBar/sideBarCardContents/availabilitiesWrapper";
import { useState } from "react";

export default function Availabilities() {
  const [isAllAvailabilities, setIsAllAvailabilities] =
    useState<Boolean>(false);

  return (
    <div className="cardContent">
      <div>Availabilities</div>
      <AvailabilitiesWrapper>
        <CustomCheckBox
          text="Search all availabilities?"
          checked={isAllAvailabilities}
          onChange={(e: any) => setIsAllAvailabilities(e.target.checked)}
        />
        {isAllAvailabilities && (
          <div className="hideOption">
            <CustomCheckBox text="Stream" />
            <CustomCheckBox text="Free" />
            <CustomCheckBox text="Ads" />
            <CustomCheckBox text="Rent" />
            <CustomCheckBox text="Buy" />
          </div>
        )}
      </AvailabilitiesWrapper>
    </div>
  );
}
