import Icon from '@src/components/icon/icon';
import React from 'react';
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
  filePath?: string;
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors['breadcrumb.focusForeground']};
  }
`;

export default function Breadcrumbs({ filePath }: BreadcrumbsProps) {
  const fileParts = filePath?.split('/');

  return (
    fileParts && fileParts.length > 0 ? (
      <Container>
      {
          fileParts.map((filePart, index) => {
            const isFileName = fileParts.length - 1 === index;

            return (
              <BreadcrumbContainer>
                {
                  isFileName && (
                    <Icon entityName={filePart} />
                  )
                }
                <div style={{ marginLeft: isFileName? "5px": 0 }}>
                  {filePart}
                </div>
                {
                  !isFileName && (
                    <div className="codicon codicon-chevron-right" />
                  )
                }
              </BreadcrumbContainer>
            )
          })
        }
      </Container>
    ): null
  );
}
