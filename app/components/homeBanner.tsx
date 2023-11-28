import homeBannerStyles from "@styles/pages/home/homeBanner.module.scss";

export default function HomeBanner({ imagePath }: any) {
  return (
    <div
      className={homeBannerStyles.banner}
      style={{
        backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)${imagePath}")`,
      }}
    >
      <div>
        <div className={homeBannerStyles.intro_text}>
          <div>Welcome.</div>
          <div>
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
        </div>
      </div>
    </div>
  );
}
