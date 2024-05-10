import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <h1>main lyout</h1>
      {children}
    </>
  );
};
export default MainLayout;
