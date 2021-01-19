export function lastIntersect(node: HTMLElement, { nth } = { nth: -2 }) {
  const getNth = () => [...node.children].slice(nth)[0];

  let lastObservedEl = getNth();

  const intObserver = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
  
      intObserver.unobserve(entry.target);

      node.dispatchEvent(new CustomEvent('intersect'));
    },
    {
      rootMargin: '0px',
      threshold: .8
    }
  );
  intObserver.observe(lastObservedEl);
    
  const mutObserver = new MutationObserver(mutations => {
    if (lastObservedEl) intObserver.unobserve(lastObservedEl);

    lastObservedEl = getNth();
    intObserver.observe(lastObservedEl);
  });

  mutObserver.observe(node, { childList: true });
}