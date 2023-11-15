import { Dot, LoadingWrapper } from "@/styles/components/loadingWrapper";

export default function Loading() {
  return (
    <LoadingWrapper>
      <div className="dot-spinner">
        <div className="container">
          {[...Array(8)].map((_, i) => (
            <Dot key={i} i={i} />
          ))}
        </div>
      </div>
    </LoadingWrapper>
  );
}
