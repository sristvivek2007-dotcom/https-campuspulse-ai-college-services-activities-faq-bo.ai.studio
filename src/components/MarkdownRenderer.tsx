import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split into paragraphs / lines
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const parseInline = (text: string): React.ReactNode[] => {
    // Process bold, italic, inline code, and URLs
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+|\([0-9]{3}\)\s*[0-9]{3}-[0-9]{4}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(<strong key={match.index} className="font-semibold text-slate-900">{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code key={match.index} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-mono">
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith('[') && token.includes('](')) {
        const title = token.slice(1, token.indexOf(']('));
        const url = token.slice(token.indexOf('](') + 2, -1);
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {title}
          </a>
        );
      } else if (token.startsWith('http://') || token.startsWith('https://')) {
        parts.push(
          <a
            key={match.index}
            href={token}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium break-all"
          >
            {token}
          </a>
        );
      } else if (token.includes('@')) {
        parts.push(
          <a
            key={match.index}
            href={`mailto:${token}`}
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
          >
            {token}
          </a>
        );
      } else if (token.match(/\([0-9]{3}\)/)) {
        parts.push(
          <a
            key={match.index}
            href={`tel:${token.replace(/[^0-9]/g, '')}`}
            className="text-emerald-700 hover:text-emerald-900 font-medium underline"
          >
            {token}
          </a>
        );
      }
      lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-5 list-disc text-slate-700">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Unordered bullet item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      inList = true;
      const bulletContent = trimmed.replace(/^[-*•]\s+/, '');
      listItems.push(
        <li key={`li-${i}`} className="leading-relaxed">
          {parseInline(bulletContent)}
        </li>
      );
      continue;
    }

    // Numbered item
    if (/^\d+\.\s+/.test(trimmed)) {
      flushList();
      const numContent = trimmed.replace(/^\d+\.\s+/, '');
      const numMatch = trimmed.match(/^(\d+)\./);
      const num = numMatch ? numMatch[1] : '1';
      elements.push(
        <div key={`num-${i}`} className="my-1.5 flex items-start gap-2.5 leading-relaxed text-slate-700">
          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mt-0.5">
            {num}
          </span>
          <div className="flex-1">{parseInline(numContent)}</div>
        </div>
      );
      continue;
    }

    flushList();

    // Headers
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="text-sm font-bold text-slate-900 mt-3 mb-1">
          {parseInline(trimmed.replace(/^###\s+/, ''))}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-base font-bold text-slate-900 mt-4 mb-1.5 border-b border-slate-100 pb-1">
          {parseInline(trimmed.replace(/^##\s+/, ''))}
        </h3>
      );
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${i}`} className="my-1.5 leading-relaxed text-slate-700">
        {parseInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1 text-[14.5px] leading-relaxed">{elements}</div>;
};
