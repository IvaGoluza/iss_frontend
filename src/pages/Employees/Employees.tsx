import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import SearchList from '../../components/SearchList';
import axios from 'axios';
import NewEmployeeModal from './NewEmployeeModal';
import { Link } from 'react-router-dom';

// Postavljanje modala na korijen aplikacije
Modal.setAppElement('#root');

export interface EmployeeType {
  id: number;
  name: string;
  email: string;
  dateEnd: string | null;
  dateStart: string;
  position: string;
  aktivName: string | null;
}

export default function Employees() {
  const [inputText, setInputText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employees, setEmployees] = useState<EmployeeType[]>();
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeType[]>();
  const [filterMode, setFilterMode] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/employee/getAll',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  const showPredmetne = () => {
    if (employees) {
      setFilteredEmployees(
        employees.filter((man) => man.position.includes('predmetna'))
      );
      setFilterMode(true);
    }
  };

  const showRazredne = () => {
    if (employees) {
      setFilteredEmployees(
        employees.filter((man) => man.position.includes('razredna'))
      );
      setFilterMode(true);
    }
  };

  const showAll = () => {
    setFilteredEmployees(employees);
    setFilterMode(false);
  };

  return (
    <div className="h-[92.5vh] md:px-16 px-8 grid grid-rows-1 pt-10 grid-cols-3 gap-6">
      <div className="col-span-2 bg-white rounded-xl min-h-[70vh] h-fit pb-5 border border-[#6AA2F6]">
        <div className="text-white bg-[#647CF6] rounded-t-[0.6rem] px-7 py-3 text-sm font-bold grid grid-rows-1 grid-cols-2">
          <span>Ime i prezime</span>
          <span>Nastavnik</span>
        </div>
        <div className="flex flex-col px-4">
          {filteredEmployees?.map((man) => (
            <Link to={`/employees/${man.id}`} key={man.id}>
              <div className="grid grid-rows-1 grid-cols-2 bg-gradient-to-r from-[#DCDFF0] to-white px-3 py-2 font-semibold mt-1.5 rounded-xl">
                <span>{man.name}</span>
                <span className="relative">
                  <div
                    className={`absolute -left-5 top-1 h-4 w-4 rounded-full bg-gradient-to-tr ${
                      man.position.includes('predmetna')
                        ? 'from-[#9F04E8] to-[#DB06FD]'
                        : 'from-[#FC3EB2] to-[#FFADA8]'
                    } mr-2`}
                  ></div>
                  {man.position}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-1 bg-gradient-to-t from-white to-[#219CE5] rounded-xl h-4/5 pt-10 px-8 lg:px-14 pb-8 flex flex-col justify-between">
        <div>
          <p className="font-bold text-white">Pretraži djelatnike po imenu</p>
          <div className="border border-white w-full h-8 rounded-2xl px-2 text-white flex flex-row items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              onChange={inputHandler}
              value={inputText}
              className="bg-transparent outline-none ml-2"
            />
          </div>
          {inputText !== '' && employees && (
            <SearchList data={employees} input={inputText} />
          )}
        </div>

        <div>
          {filterMode && (
            <button
              className="w-full text-white font-semibold bg-gradient-to-tr hover:bg-gradient-to-tl from-[#08B4D5] to-[#219CE5] rounded-xl py-3 text-sm px-2 mt-3"
              onClick={showAll}
            >
              Pregled svih nastavnika
            </button>
          )}
          <button
            className="w-full text-white font-semibold bg-gradient-to-tr hover:bg-gradient-to-tl from-[#9F04E8] to-[#DB06FD] rounded-xl py-3 text-sm px-2 mt-3"
            onClick={showPredmetne}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Nastavnici predmetne
            nastave
          </button>
          <button
            className="w-full text-white font-semibold bg-gradient-to-tr hover:bg-gradient-to-tl from-[#E949EC] to-[#FF6736] rounded-xl py-3 text-sm px-2 my-2"
            onClick={showRazredne}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Nastavnici razredne
            nastave
          </button>
          <button
            className="w-full text-[#03294D] font-bold bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] rounded-xl py-3 text-sm px-2"
            onClick={() => setModalIsOpen(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Dodaj novog djelatnika
          </button>
        </div>
      </div>
      <NewEmployeeModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setFilteredEmployees={setFilteredEmployees}
        setEmployees={setEmployees}
      />
    </div>
  );
}
