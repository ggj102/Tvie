import loadingStyles from "@styles/common/loading.module.scss";

export default function Loading() {
  return (
    <div className={loadingStyles.loading}>
      <div className={loadingStyles.dot_spinner}>
        <div className={loadingStyles.container}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={loadingStyles.dot} />
          ))}
        </div>
      </div>
    </div>
  );
}
