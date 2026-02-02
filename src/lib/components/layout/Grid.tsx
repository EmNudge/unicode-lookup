import { createMemo, type JSX } from "solid-js";
import { css } from "solid-styled";

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
type ColumnsValue = number | "auto-fit" | "auto-fill";

interface GridProps {
  columns?: ColumnsValue;
  gap?: SpacingValue;
  columnGap?: SpacingValue;
  rowGap?: SpacingValue;
  minColumnWidth?: string;
  children?: JSX.Element;
}

export function Grid(props: GridProps) {
  const gridTemplateColumns = createMemo(() => {
    const columns = props.columns ?? 1;
    const minColumnWidth = props.minColumnWidth ?? "200px";
    if (typeof columns === "number") {
      return `repeat(${columns}, 1fr)`;
    } else if (columns === "auto-fit" || columns === "auto-fill") {
      return `repeat(${columns}, minmax(${minColumnWidth}, 1fr))`;
    }
    return "1fr";
  });

  const classes = createMemo(() =>
    [
      "grid",
      props.gap !== undefined && `grid--gap-${props.gap}`,
      props.columnGap !== undefined && `grid--column-gap-${props.columnGap}`,
      props.rowGap !== undefined && `grid--row-gap-${props.rowGap}`,
    ]
      .filter(Boolean)
      .join(" "),
  );

  const style = createMemo(() => `grid-template-columns: ${gridTemplateColumns()};`);

  css`
    .grid {
      display: grid;
    }
    .grid--gap-0 {
      gap: var(--space-0);
    }
    .grid--gap-1 {
      gap: var(--space-1);
    }
    .grid--gap-2 {
      gap: var(--space-2);
    }
    .grid--gap-3 {
      gap: var(--space-3);
    }
    .grid--gap-4 {
      gap: var(--space-4);
    }
    .grid--gap-5 {
      gap: var(--space-5);
    }
    .grid--gap-6 {
      gap: var(--space-6);
    }
    .grid--gap-8 {
      gap: var(--space-8);
    }
    .grid--gap-10 {
      gap: var(--space-10);
    }
    .grid--gap-12 {
      gap: var(--space-12);
    }
    .grid--column-gap-0 {
      column-gap: var(--space-0);
    }
    .grid--column-gap-1 {
      column-gap: var(--space-1);
    }
    .grid--column-gap-2 {
      column-gap: var(--space-2);
    }
    .grid--column-gap-3 {
      column-gap: var(--space-3);
    }
    .grid--column-gap-4 {
      column-gap: var(--space-4);
    }
    .grid--column-gap-5 {
      column-gap: var(--space-5);
    }
    .grid--column-gap-6 {
      column-gap: var(--space-6);
    }
    .grid--column-gap-8 {
      column-gap: var(--space-8);
    }
    .grid--column-gap-10 {
      column-gap: var(--space-10);
    }
    .grid--column-gap-12 {
      column-gap: var(--space-12);
    }
    .grid--row-gap-0 {
      row-gap: var(--space-0);
    }
    .grid--row-gap-1 {
      row-gap: var(--space-1);
    }
    .grid--row-gap-2 {
      row-gap: var(--space-2);
    }
    .grid--row-gap-3 {
      row-gap: var(--space-3);
    }
    .grid--row-gap-4 {
      row-gap: var(--space-4);
    }
    .grid--row-gap-5 {
      row-gap: var(--space-5);
    }
    .grid--row-gap-6 {
      row-gap: var(--space-6);
    }
    .grid--row-gap-8 {
      row-gap: var(--space-8);
    }
    .grid--row-gap-10 {
      row-gap: var(--space-10);
    }
    .grid--row-gap-12 {
      row-gap: var(--space-12);
    }
  `;

  return (
    <div class={classes()} style={style()}>
      {props.children}
    </div>
  );
}
