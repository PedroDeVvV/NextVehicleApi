"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./mainPage.module.css";

export default function Home() {
  const [vehicles, setVehicles] = useState(null);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  let listName = [];

  useEffect(() => {
    axios
      .get(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      )
      .then((r) => {
        setVehicles(r.data);
      });
  }, []);

  useEffect(() => {}, [selectedMakeId, selectedYear]);

  if (!vehicles) {
    return <p>Loading...</p>;
  }

  for (let i = 0; i < vehicles.Results.length; i++) {
    listName.push(
      <option key={i} value={vehicles.Results[i].MakeId}>
        {vehicles.Results[i].MakeName}
      </option>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.mainForms}>
        <p>Choose a car</p>
        <form className={styles.mainVehicles}>
          <label
            htmlFor="vehicles"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="vehicles"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedMakeId}
            onChange={(e) => setSelectedMakeId(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a vehicle
            </option>
            {listName}
          </select>
        </form>

        <form className={styles.yearsOfVehicles}>
          <label
            htmlFor="vehiclesYears"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a year
          </label>
          <select
            id="vehiclesYears"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a year
            </option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </form>

        <form className={styles.button}>
          {selectedYear && selectedMakeId ? (
            <button className={styles.buttonNextVehicle}>
              <Link href={`/details?id=${selectedMakeId}&year=${selectedYear}`}>
                Next
              </Link>
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </main>
  );
}
