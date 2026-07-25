import type { ReactNode } from "react";

type Heading = {
  level: number;
  text: string;
  id: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function inlineMarkdown(value: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  return value.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

export function extractHeadings(markdown: string): Heading[] {
  return markdown
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      level: match[1].length,
      text: match[2],
      id: slugify(match[2]),
    }));
}

function isSpecialLine(line: string) {
  return (
    /^#{2,4}\s/.test(line) ||
    /^```/.test(line) ||
    /^>\s?/.test(line) ||
    /^(-{3,})$/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    /^\|.+\|$/.test(line)
  );
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  const lines = markdown.trim().split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const id = slugify(text);
      const content = <a href={`#${id}`}>{inlineMarkdown(text)}</a>;

      if (level === 2) {
        blocks.push(<h2 id={id} key={`h-${index}`}>{content}</h2>);
      } else if (level === 3) {
        blocks.push(<h3 id={id} key={`h-${index}`}>{content}</h3>);
      } else {
        blocks.push(<h4 id={id} key={`h-${index}`}>{content}</h4>);
      }
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push(
        <div className="article-code" key={`code-${index}`}>
          <div className="article-code-bar">
            <span><i /><i /><i /></span>
            <span>{language || "workflow"}</span>
          </div>
          <pre><code>{code.join("\n")}</code></pre>
        </div>,
      );
      index += 1;
      continue;
    }

    if (/^(-{3,})$/.test(line.trim())) {
      blocks.push(<hr key={`hr-${index}`} />);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trimStart().startsWith(">")) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(<blockquote key={`quote-${index}`}>{inlineMarkdown(quote.join(" "))}</blockquote>);
      continue;
    }

    if (/^\|.+\|$/.test(line.trim())) {
      const rows: string[][] = [];
      while (index < lines.length && /^\|.+\|$/.test(lines[index].trim())) {
        const cells = lines[index].trim().slice(1, -1).split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      const [header, ...body] = rows;
      blocks.push(
        <div className="article-table-wrap" key={`table-${index}`}>
          <table>
            <thead><tr>{header.map((cell) => <th key={cell}>{inlineMarkdown(cell)}</th>)}</tr></thead>
            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inlineMarkdown(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const unordered = /^[-*]\s+/.test(line.trim());
    const ordered = /^\d+\.\s+/.test(line.trim());
    if (unordered || ordered) {
      const items: string[] = [];
      const matcher = unordered ? /^[-*]\s+/ : /^\d+\.\s+/;
      while (index < lines.length && matcher.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(matcher, ""));
        index += 1;
      }
      const listItems = items.map((item, itemIndex) => <li key={itemIndex}>{inlineMarkdown(item)}</li>);
      blocks.push(ordered ? <ol key={`list-${index}`}>{listItems}</ol> : <ul key={`list-${index}`}>{listItems}</ul>);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isSpecialLine(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={`p-${index}`}>{inlineMarkdown(paragraph.join(" "))}</p>);
  }

  return <div className="article-prose">{blocks}</div>;
}

