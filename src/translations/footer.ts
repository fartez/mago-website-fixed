import { Language } from '../contexts/LanguageContext';

const footerTranslations = {
  ge: {
    contact: 'კონტაქტი',
    menu: 'მენიუ',
    followUs: 'შემოგვიერთდით',
    followSocial: 'თვალი ადევნე ჩვენს სოციალურ მედიას!',
    home: 'მთავარი',
    magotherapy: 'მაგოთერაპია',
    faq: 'შეკითხვები',
    gallery: 'გალერეა',
    results: 'შედეგები',
    about: 'ჩვენს შესახებ',
    contactLink: 'კონტაქტი',
    visitorsCount: 'ვიზიტორთა რაოდენობა',
    address: 'თბილისი, ანნა პოლიტკოვსკაის ქუჩა (ჯიქია) 4 გ. "ჯიქია რეზიდენსი". მეტრო სახელმწიფო უნივერსიტეტი',
    facebookButton: 'გამოგვყევი',
    youtubeButton: 'გამოიწერე არხი',
  },
  en: {
    contact: 'Contact',
    menu: 'Menu',
    followUs: 'Follow Us',
    followSocial: 'Follow our social media!',
    home: 'Home',
    magotherapy: 'Magotherapy',
    faq: 'FAQ',
    gallery: 'Gallery',
    results: 'Results',
    about: 'About Us',
    contactLink: 'Contact',
    visitorsCount: 'Visitor count',
    address: 'Tbilisi, Anna Politkovskaya St. (Jiqia) 4G. Jiqia Residence. Metro State University',
    facebookButton: 'Follow',
    youtubeButton: 'Subscribe',
  },
  ru: {
    contact: 'Контакт',
    menu: 'Меню',
    followUs: 'Присоединяйтесь',
    followSocial: 'Следите за нашими социальными сетями!',
    home: 'Главная',
    magotherapy: 'Маготерапия',
    faq: 'Вопросы',
    gallery: 'Галерея',
    results: 'Результаты',
    about: 'О нас',
    contactLink: 'Контакт',
    visitorsCount: 'Количество посетителей',
    address: 'Тбилиси, ул. Анны Политковской (Джикия) 4Г. Джикия Резиденс. Метро Государственный университет',
    facebookButton: 'Подписаться',
    youtubeButton: 'Подписаться на канал',
  },
};

export function useFooterTranslations(language: Language) {
  return footerTranslations[language];
}
