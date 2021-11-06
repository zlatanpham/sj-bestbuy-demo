interface SkeletonProps {
  className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const { className } = props;

  return (
    <div
      className={['animate-pulse bg-black bg-opacity-10', className]
        .filter(Boolean)
        .join(' ')}
    />
  );
};
