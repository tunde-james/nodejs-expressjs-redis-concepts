require('dotenv').config();
const express = require('express');

const { configureCors } = require('./config/cors-config');
const {
  requestLogger,
  addTimeStamp,
} = require('./middleware/custom-middleware');
const { globalErrorHandler } = require('./middleware/error-handler');
const { urlVersion } = require('./middleware/api-versioning');
const { createBasicRateLimiter } = require('./middleware/rate-limit');
const itemRoutes = require('./routes/item-routes');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15 * 60 * 1000)); // 100 request/15mins
app.use(express.json());

app.use(urlVersion('v1'));

app.use('/api/v1', itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is now running on PORT ${PORT}`);
});
