const express = require("express");
const path = require("path");
const { getLocationFromIp, fetchWeatherDataByCountry } = require("./shared");

const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const data = await getLocationFromIp();
  const values = await fetchWeatherDataByCountry(data.city);
  console.log(fetchWeatherDataByCountry("hello"));
  const dateToday = new Date(values.location.localtime).toLocaleDateString(
    "en-uS",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const dateToUTCtime = new Date(values.location.localtime).toLocaleTimeString(
    "en-uS",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const getWeekDayFromDate = (date) =>
    new Date(date).toLocaleString("en-us", {
      weekday: "short",
    });

  const dynamicData = {
    city: data.city,
    country: data.country_name,
    temperature: values.current.temp_c,
    weathericon: `https:${values.current.condition.icon}`,
    forecast: values.current.condition.text,
    time: dateToday,
    dateTime: dateToUTCtime,
    threeDaysForecast: values.forecast.forecastday,
    getWeekDayFromDate: getWeekDayFromDate,
  };

  res.render("index", { dynamicData });
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "app.js"));
});
app.get("/shared.js", (req, res) => {
  res.sendFile(path.join(__dirname, "shared.js"));
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
