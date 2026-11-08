/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function LandscapeCover() {
  return (
    <div className="landscape-cover">
      <div className="landscape-cover_img">
        <img
          loading="eager"
          src="/assets/images/landscape.svg"
          alt=""
          className="img contain"
        />
      </div>
      <div className="landscape-cover_bg" />
    </div>
  );
}
