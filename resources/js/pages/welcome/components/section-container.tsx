import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
};

const SectionContainer: FC<Props> = ({ children, className }) => {
  return <div className={`container mx-auto max-w-6xl px-6 ${className}`}>{children}</div>;
};

export default SectionContainer;
