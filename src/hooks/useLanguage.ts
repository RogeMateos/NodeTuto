import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useTutorialStore from '@/store/tutorialStore';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const setLanguage = useTutorialStore((state) => state.setLanguage);

  const changeLanguage = useCallback(
    (lang: 'es' | 'en') => {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    },
    [i18n, setLanguage]
  );

  return {
    current: (useTutorialStore((state) => state.language) as 'es' | 'en'),
    change: changeLanguage,
    t: i18n.t,
  };
};
