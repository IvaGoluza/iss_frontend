import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Aktiv = {
  idAktiv: number;
  aktivName: string;
};

const Actives = () => {
  const [names, setNames] = useState<Aktiv[]>([]);
  const [newName, setNewName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleInsertName = async () => {
    if (newName.trim() !== '') {
      try {
        const response = await axios.post(
          'http://localhost:8080/aktiv/create',
          { aktivName: newName },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setNames([...names, response.data]);
        setNewName('');
      } catch (error) {
        console.error('Error creating new aktiv:', error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/aktiv/getAll', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNames(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-20">
      <div className="my-4">
        <input
          type="text"
          value={newName}
          onChange={handleInputChange}
          placeholder="Unesite ime aktiva"
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <button
          onClick={handleInsertName}
          className="bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] font-bold py-2 px-4 rounded"
        >
          Dodaj aktiv
        </button>
      </div>
      <table className="border border-collapse w-1/2 text-center">
        <thead>
          <tr>
            <th className="border p-2 bg-sky-100">Vaši aktivi</th>
          </tr>
        </thead>
        <tbody>
          {names.map((aktiv, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{aktiv.aktivName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Actives;
