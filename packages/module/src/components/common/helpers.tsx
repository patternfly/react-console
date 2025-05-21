import { Children } from 'react';

export const child = (children: React.ReactNode, index: number) => {
  const childrenArray = Children.toArray(children);
  return (childrenArray && childrenArray.length > index && childrenArray[index]) || null;
};
