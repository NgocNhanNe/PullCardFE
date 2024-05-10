import { ReactNode } from 'react';
import './GlobalStyle.module.scss';

type GlobalStyleProp = {
  children: ReactNode;
};
const GlobalStyle = ({ children }: GlobalStyleProp) => children;

export default GlobalStyle;
