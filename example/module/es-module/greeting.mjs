const helloInLang = {
  en: 'Hello world!',
  es: '¡Hola mundo!',
  ru: 'Привет мир!'
};

export const getHello = (lang) => (
  helloInLang[lang]
);

export const sayHello = (lang) => {
  console.log(getHello(lang));
};