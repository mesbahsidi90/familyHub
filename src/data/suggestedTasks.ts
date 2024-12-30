interface TaskTranslations {
  en: string;
  ar: string;
  tr: string;
}

interface SuggestedTask {
  id: string;
  translations: TaskTranslations;
  category: string;
}

export const suggestedTasks: SuggestedTask[] = [
  {
    id: 'make-bed',
    translations: {
      en: 'Making the bed',
      ar: 'ترتيب السرير',
      tr: 'Yatağı düzeltmek'
    },
    category: 'daily'
  },
  {
    id: 'brush-teeth',
    translations: {
      en: 'Brushing teeth',
      ar: 'تنظيف الأسنان',
      tr: 'Diş fırçalamak'
    },
    category: 'daily'
  },
  {
    id: 'quran',
    translations: {
      en: "Reading the daily portion of the Qur'an",
      ar: 'قراءة الورد اليومي من القرآن',
      tr: "Günlük Kur'an okuma"
    },
    category: 'worship'
  },
  {
    id: 'fajr',
    translations: {
      en: 'Fajr prayer',
      ar: 'صلاة الفجر',
      tr: 'Sabah namazı'
    },
    category: 'prayer'
  },
  {
    id: 'dhuhr',
    translations: {
      en: 'Dhuhr prayer',
      ar: 'صلاة الظهر',
      tr: 'Öğle namazı'
    },
    category: 'prayer'
  },
  {
    id: 'asr',
    translations: {
      en: 'Asr prayer',
      ar: 'صلاة العصر',
      tr: 'İkindi namazı'
    },
    category: 'prayer'
  },
  {
    id: 'maghrib',
    translations: {
      en: 'Maghrib prayer',
      ar: 'صلاة المغرب',
      tr: 'Akşam namazı'
    },
    category: 'prayer'
  },
  {
    id: 'isha',
    translations: {
      en: 'Isha prayer',
      ar: 'صلاة العشاء',
      tr: 'Yatsı namazı'
    },
    category: 'prayer'
  },
  {
    id: 'adhkar',
    translations: {
      en: 'Morning and evening remembrances',
      ar: 'أذكار الصباح والمساء',
      tr: 'Sabah ve akşam zikirler'
    },
    category: 'worship'
  },
  {
    id: 'reading',
    translations: {
      en: 'Reading a book for 15 minutes',
      ar: 'قراءة كتاب لمدة 15 دقيقة',
      tr: '15 dakika kitap okumak'
    },
    category: 'personal-development'
  }
];