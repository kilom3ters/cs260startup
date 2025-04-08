const WebSocket = require('ws');

describe('WebSocket Server', () => {
  let ws;

  beforeEach((done) => {
    ws = new WebSocket('ws://localhost:4000');
    ws.on('open', done);
    ws.on('error', done);
  });

  afterEach(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  });

  test('receives welcome message upon connection', (done) => {
    ws.on('message', (data) => {
      try {
        expect(data).toBe('Welcome to the WebSocket server!');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test('echoes back sent message', (done) => {
    let welcomeReceived = false;
    ws.on('message', (data) => {
      if (!welcomeReceived) {
        welcomeReceived = true;
        ws.send('Hello WebSocket');
      } else {
        try {
          expect(data).toBe('Hello WebSocket');
          done();
        } catch (err) {
          done(err);
        }
      }
    });
  });
});
