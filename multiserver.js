import { config } from 'dotenv';
import os from 'os';
import { Mutex } from 'async-mutex';
import cluster from 'cluster';
import http from 'http';
import app from './app.js';
import UserData from './db.js';

config();
const port = process.env.PORT || 3000;
const numCPUs = os.cpus().length;
let workerIndex = 0;
let userData = UserData;
const loadBalancer = http.createServer((req, res) => {
  const worker = Object.values(cluster.workers)[workerIndex];
  const proxy = http.request({
    hostname: 'localhost',
    port: +port + worker.id,
    method: req.method,
    headers: req.headers,
    path: req.url,
  }, (workerResponse) => {
    res.statusCode = workerResponse.statusCode;
    workerResponse.pipe(res);
  });
  req.pipe(proxy);
  workerIndex = (workerIndex + 1) % (numCPUs);
});

if (cluster.isPrimary) {
  loadBalancer.listen(port, () => {
    console.log('Load balancer is listening on port 3000');
  });
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  Object.values(cluster.workers).map((w) => {
    w.send({ type: 'UserData', data: userData });
    return w;
  });

  const mutex = new Mutex();

  cluster.on('message', async (worker, message) => {
    const release = await mutex.acquire();
    try {
      if (message.type === 'updateUserData') {
        userData = message.data;
      }
      Object.values(cluster.workers).map((w) => {
        w.send({ type: 'UserData', data: userData });
        return w;
      });
    } finally {
      release();
    }
  });

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  process.on('message', (message) => {
    if (message.type === 'UserData') {
      app.set('UserData', message.data);
    }
  });
  app.listen(+port + cluster.worker.id, () => {
    console.log(`Worker ${process.pid} started on port ${port + cluster.worker.id}`);
  });
}
