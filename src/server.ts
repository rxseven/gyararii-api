import app from './app';

// Bind and listen for connections on the specified host and port
const server = app.listen(app.get('port'), () =>
  console.log(`Listening on port ${app.get('port')}`)
);

export default server;
