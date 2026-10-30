import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { SubjectsPage } from '@/pages/SubjectsPage';
import { SubjectPage } from '@/pages/SubjectPage';
import { LessonPage } from '@/pages/LessonPage';
import { PathPage, PathsPage } from '@/pages/PathsPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { NotesPage } from '@/pages/NotesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subjects/:subjectId" element={<SubjectPage />} />
        <Route path="subjects/:subjectId/:moduleSlug/:lessonSlug" element={<LessonPage />} />
        <Route path="paths" element={<PathsPage />} />
        <Route path="paths/:pathId" element={<PathPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
