"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";

interface EnhancedMarkdownProps {
    content: string;
    className?: string;
}

export default function EnhancedMarkdown({ content, className }: EnhancedMarkdownProps) {
    return (
        <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-xl font-bold text-foreground mt-2 mb-2">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-lg font-semibold text-foreground mt-2 mb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-base font-medium text-foreground mt-1 mb-1">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc space-y-1 mb-2 text-sm text-muted-foreground">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal space-y-1 mb-2 text-sm text-muted-foreground">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-sm text-muted-foreground">{children}</li>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-muted-foreground">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground my-2">
                            {children}
                        </blockquote>
                    ),
                    code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground">
                                {children}
                            </code>
                        ) : (
                            <pre className="bg-muted rounded-lg p-3 overflow-x-auto my-2">
                                <code className={cn("text-xs font-mono text-foreground", className)}>
                                    {children}
                                </code>
                            </pre>
                        );
                    },
                    img: ({ src, alt }) => (
                        <div className="my-6 flex flex-col gap-2">
                            <img
                                src={src}
                                alt={alt}
                                className="w-full h-auto max-h-56 object-cover"
                            />
                            {alt && (
                                <p className="text-sm text-muted-foreground text-center italic">
                                    {alt}
                                </p>
                            )}
                        </div>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 break-all hover:underline text-sm"
                        >
                            {children}
                        </a>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-2">
                            <table className="w-full text-sm border-collapse">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-muted">{children}</thead>
                    ),
                    th: ({ children }) => (
                        <th className="border border-border px-3 py-2 text-left font-semibold text-foreground text-xs">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-border px-3 py-2 text-muted-foreground text-xs">
                            {children}
                        </td>
                    ),
                    hr: () => <hr className="border-border my-3" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}