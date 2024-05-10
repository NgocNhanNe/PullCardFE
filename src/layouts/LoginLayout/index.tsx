import * as React from 'react';
import { ReactNode } from 'react';

type LoginLayoutProp = {
  children: ReactNode;
};
const LoginLayout = ({ children }: LoginLayoutProp) => {
  return (
    <div>
      login layout
      {children}
    </div>
  );
};
export default LoginLayout;
