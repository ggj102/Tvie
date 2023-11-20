import { GlobalContext } from "@/app/context";
import { Dot, LoadingWrapper } from "@/styles/components/loadingWrapper";
import { useContext } from "react";

export default function Loading() {
  const { isLoading } = useContext(GlobalContext);

  return (
    isLoading && (
      <LoadingWrapper>
        <div className="dot-spinner">
          <div className="container">
            {[...Array(8)].map((_, i) => (
              <Dot key={i} i={i} />
            ))}
          </div>
        </div>
      </LoadingWrapper>
    )
  );
}
