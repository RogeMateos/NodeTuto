import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTutorialStore from '@/store/tutorialStore';
import { LessonViewer } from '@/components/Lesson/LessonViewer';
import { BreadCrumb } from '@/components/Lesson/BreadCrumb';
import { NavigationButtons } from '@/components/Lesson/NavigationButtons';

export const Lesson = () => {
  const { moduleId, lessonId } = useParams();
  const tutorials = useTutorialStore((state) => state.tutorials);
  const setCurrentLesson = useTutorialStore((state) => state.setCurrentLesson);

  const module = tutorials.find((m) => m.id === moduleId);
  const lesson = module?.lessons?.find((l) => l.id === lessonId) || null;

  useEffect(() => {
    if (lesson) {
      setCurrentLesson(lesson);
    }
  }, [lesson, setCurrentLesson]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <BreadCrumb module={module} lesson={lesson} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          <LessonViewer lesson={lesson} />
          <NavigationButtons module={module} currentLesson={lesson} />
        </div>

        {/* Related (future) */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 bg-gray-50 dark:bg-slate-900 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Contenido relacionado
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Coming soon...
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
