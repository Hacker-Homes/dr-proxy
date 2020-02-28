import ReactDOMServer from 'react-dom/server';

const layout = (reviewComponent) => `
<!DOCTYPE html>
<html>
  <script src="http://localhost:3000/reviews.js"></script>
  <body>
    <div id="reviews">
      ${ReactDOMServer.renderToString(reviewComponent)}
    </div>
  </body>
</html>
`;

export default layout;
