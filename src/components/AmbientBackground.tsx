export default function AmbientBackground() {
  return (
    <div className="ambient-scene" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orbit ambient-orbit-one" />
      <div className="ambient-orbit ambient-orbit-two" />
      <div className="ambient-color ambient-color-accent" />
      <div className="ambient-color ambient-color-neutral" />
    </div>
  );
}
