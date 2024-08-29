'use client'; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../page.module.css'

const Page = () => {
  const [car, setCar] = useState([]);
  const [year, setYear] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const yearFromParams = params.get("year");
    const idFromParams = params.get("id");
    setYear(yearFromParams);
    setId(idFromParams);
  }, []);

  useEffect(() => {
    if (id && year) {
      axios
        .get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${id}/modelyear/${year}?format=json`)
        .then((response) => {
          setCar(response.data.Results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id, year]);

  return (
    <section className={styles.mainDetails}>
      <ul>
        {car.length > 0 ? (
          car.map((carItem, i) => (
            <li key={i}>
              <b>Brand name:</b> {carItem.Make_Name} - <b>Model Name:</b> {carItem.Model_Name} - <b>Year</b> {year}
            </li>
          ))
        ) : (
          <p>This vehicle does not exist in our database.</p>
        )}
      </ul>
      <Link href='/' className={styles.buttonBackHome}>Back to home</Link>
    </section>
  );
};

export default Page;
