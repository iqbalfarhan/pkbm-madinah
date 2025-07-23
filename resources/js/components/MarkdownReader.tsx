import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownReaderProps = {
  value: string;
  className?: string;
};

const MarkdownReader: FC<MarkdownReaderProps> = ({ value, className }) => {
  const { appearance } = useAppearance();

  return (
    <article className={cn('mx-auto prose w-full', appearance != 'light' && 'prose-invert', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
    </article>
  );
};

export default MarkdownReader;
