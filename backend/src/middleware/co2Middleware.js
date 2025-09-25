import { co2 } from "@tgwf/co2";

const co2Emission = new co2({ model: "swd" });

const co2Middleware = (req, res, next) => {
  let requestBytes = 0;
  let responseBytes = 0;

  if (req.body) {
    requestBytes = Buffer.byteLength(JSON.stringify(req.body), "utf8");
  }
  if (req.query) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.query), "utf8");
  }
  if (req.headers) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.headers), "utf8");
  }

  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk, ...args) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, "utf8");
    }
    return originalWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk, ...args) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, "utf8");
    }

    if (!res.locals.totalBytes) {
      res.locals.totalBytes = 0;
    }

    res.locals.totalBytes += requestBytes + responseBytes;

    const greenHost = false;
    const emissions = co2Emission.perByte(res.locals.totalBytes, greenHost);

    console.log(`Data transferred: ${res.locals.totalBytes} bytes`);
    console.log(`Estimated CO2 Emissions: ${emissions.toFixed(6)} grams`);

    return originalEnd.apply(res, [chunk, ...args]);
  };

  next();
};

export default co2Middleware;
