import { getCollection } from "../../lib/content";

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  modules?: string[];
};

export default function CoursesPage() {
  const courses = getCollection<Course>("data/courses", { excludeManifest: true });

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Courses</h1>
      <p>Browse structured learning modules built from the GCB ecosystem.</p>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong>
            <p>{course.description}</p>
            <div>Modules: {course.modules?.length ?? 0}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}