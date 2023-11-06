import { ContentLayoutWrapper } from "@/styles/components/contentLayoutWrapper";

export default function ContentLayout({ children }: any) {
  return (
    <ContentLayoutWrapper>
      <div>
        <div>{children}</div>;
      </div>
    </ContentLayoutWrapper>
  );
}
