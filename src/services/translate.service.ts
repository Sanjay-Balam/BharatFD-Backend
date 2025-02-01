import { Translate } from '@google-cloud/translate/build/src/v2';
import config from '../config/env';

const translator = new Translate({
  key: config.GOOGLE_TRANSLATE_API_KEY
});

export const translateText = async (text: string, targetLang: string) => {
  try {
    const [translation] = await translator.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error(`Translation failed for ${targetLang}:`, error);
    return text;
  }
};