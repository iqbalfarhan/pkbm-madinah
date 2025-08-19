import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
  title?: string;
  description?: string;
};

const SectionContainer: FC<Props> = ({ children, className, title, description }) => {
  return (
    <div className={`container mx-auto max-w-6xl px-6 ${className}`}>
      {title && (
        <div className="flex flex-col items-center py-10">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionContainer;
