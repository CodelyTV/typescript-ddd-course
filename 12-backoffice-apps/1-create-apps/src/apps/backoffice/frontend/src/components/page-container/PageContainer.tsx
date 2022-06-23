import React from 'react';
import PageAlert from './PageAlert';
import PageContent from './PageContent';
import PageTitle from './PageTitle';

function PageContainer({ title, alert, children }: { title: string, alert?: string, children: React.ReactNode }) {
  return (
    <div className="page-container">
        {alert && <PageAlert message={alert} /> }
        <PageTitle title={title} />
        <PageContent>{children}</PageContent>
    </div>
  );
}

export default PageContainer;
