type Course = {
  id: string;
  name: string;
  duration: string;
}

const post = async (url: string, body: Record<string, unknown>) => {
  await fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({ ...body}), 
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export const createCourse = (course: Course) =>
  post('http://localhost:3000/courses', course);