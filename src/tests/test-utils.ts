import type { JSXElementConstructor, ReactElement } from 'react';

import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

interface RenderOptions {
  options?: Record<string, unknown>;
  ui: ReactElement;
  wrapper?: JSXElementConstructor<{ children: ReactElement }>;
}

const customRender = ({ options = {}, ui, wrapper }: RenderOptions) =>
  render(ui, {
    ...options,
    wrapper: wrapper,
  });

export * from '@testing-library/react';
// override render export
export { customRender as render };
