import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = { name: string; url: string };

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Visible breadcrumb UI. For search-engine breadcrumb JSON-LD pass the same
 * `items` array to SEOHead via the `breadcrumbs` prop so that the structured
 * data stays in lockstep with what the user sees.
 */
const Breadcrumbs = ({ items, className = "" }: Props) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className={`container pt-24 pb-2 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-primary transition-colors"
            aria-label="Home"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1">
              <ChevronRight size={14} className="text-muted-foreground/60" />
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
