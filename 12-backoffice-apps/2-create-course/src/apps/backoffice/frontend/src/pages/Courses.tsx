import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NewCourseForm from '../components/new-course-form/NewCourseForm';
import PageContainer from '../components/page-container/PageContainer';

function Courses() {
  const [state, setState] = useState({ alert: '' });

  return (
    <div className="container mx-auto px-4 p-5">
      <Helmet>
        <title>CodelyTV | Cursos</title>
      </Helmet>

      <PageContainer title="Cursos" alert={state.alert}>
        <NewCourseForm
          onSuccess={state => setState({ alert: `Felicidades, el curso ${state.id} ha sido creado correctamente!` })}
          onError={() => setState({ alert: 'Lo siento, ha ocurrido un error al crear el curso' })}
        />
      </PageContainer>
    </div>
  );
}

export default Courses;
