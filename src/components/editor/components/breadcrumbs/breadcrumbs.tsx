import React, { Children, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background: ${props => props.theme.colors['breadcrumb.background']};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  user-select: none;
  color: ${props => props.theme.colors['breadcrumb.foreground']};
  font-size: 0.9em;
`;

type BreadcrumbsProps = {
  children: ReactNode;
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors['breadcrumb.focusForeground']};
  }
`;

export default function Breadcrumbs({ children }: BreadcrumbsProps) {
  const childrenCount = Children.count(children);

  return (
    <Container>
      {
        Children.map(children, (child, index) => {
          return (
            <BreadcrumbContainer>
              <div>
                {child}
              </div>
              {
                childrenCount - 1 !== index && (
                  <div className="codicon codicon-chevron-right" />
                )
              }
            </BreadcrumbContainer>
          )
        })
      }
    </Container>
  )
}
