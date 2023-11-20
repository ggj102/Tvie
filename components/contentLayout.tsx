import { ContentLayoutWrapper } from "@/styles/components/contentLayoutWrapper";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayoutWrapper>
      <div>
        <div>{children}</div>
      </div>
    </ContentLayoutWrapper>
  );
}
