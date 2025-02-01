import { v2 as translate } from '@google-cloud/translate';

const translator = new translate.Translate();

const translateText = async(text:string, targetLan: string) => {
    const [translation] = await translator.translate(text,targetLan);
    return translation
}

export default translateText;