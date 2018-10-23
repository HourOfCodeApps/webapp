import path from 'path';
import pug from 'pug';


const renderTemplate = (template, data) => {
  const compiledFunction = pug.compileFile(path.resolve(__dirname, '../templates/', `${template}.pug`));

  return compiledFunction(data);
}

export default renderTemplate;
