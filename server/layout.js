import ReactDOMServer from 'react-dom/server';

const layout = (...components) => `
<!DOCTYPE html>
<html>
  <body>
    ${components.map((component) => ReactDOMServer.renderToString(component))}
  </body>
</html>
`;

export default layout;
