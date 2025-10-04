export const SkeletonItem = ({
  height = "h-6",
  width = "w-full",
}: {
  height?: string;
  width?: string;
}) => (
  <div
    className={`${height} ${width} bg-bg-light-200 rounded-md animate-pulse`}
  />
);
