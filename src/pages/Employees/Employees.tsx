import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import SearchList from '../../components/SearchList';

// Postavljanje modala na korijen aplikacije
Modal.setAppElement('#root');

export default function Employees() {
  const ljudi = [
    { id: 1, name: 'Perko perić', works: 'Nastavnik predmetne nastave' },
    { id: 2, name: 'Ivo perić', works: 'Nastavnik razredne nastave' },
    { id: 3, name: 'Marko perić', works: 'Nastavnik razredne nastave' },
    { id: 4, name: 'Svi perić', works: 'Nastavnik predmetne nastave' },
    { id: 5, name: 'Rođaci perić', works: 'Nastavnik predmetne nastave' },
  ];

  const [inputText, setInputText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employees, setEmployees] = useState(ljudi);

  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  const showPredmetne = () => {
    setEmployees(ljudi.filter((man) => man.works.includes('predmetne')));
  };

  const showRazredne = () => {
    setEmployees(ljudi.filter((man) => man.works.includes('razredne')));
  };

  return (
    <div className="h-[92.5vh] md:px-16 px-8 grid grid-rows-1 pt-10 grid-cols-3 gap-6">
      <div className="col-span-2 bg-white rounded-xl h-4/5 border border-[#6AA2F6]">
        <div className="text-white bg-[#647CF6] rounded-t-[0.6rem] px-7 py-3 text-sm font-bold grid grid-rows-1 grid-cols-2">
          <span>Ime i prezime</span>
          <span>Nastavnik</span>
        </div>
        <div className="flex flex-col px-4">
          {employees.map((man) => (
            <div className="grid grid-rows-1 grid-cols-2 bg-gradient-to-r from-[#DCDFF0] to-white px-3 py-2 font-semibold mt-1.5 rounded-xl">
              <span>{man.name}</span>
              <span className="relative">
                <div
                  className={`absolute -left-5 top-1 h-4 w-4 rounded-full bg-gradient-to-tr ${
                    man.works.includes('predmetne')
                      ? 'from-[#9F04E8] to-[#DB06FD]'
                      : 'from-[#FC3EB2] to-[#FFADA8]'
                  } mr-2`}
                ></div>
                {man.works}
              </span>
            </div>
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
          {inputText !== '' && <SearchList data={ljudi} input={inputText} />}
        </div>

        <div>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white rounded-xl shadow-lg py-10 px-16 max-w-md mx-auto mt-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Dodaj novog djelatnika</h2>
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ime i prezime
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tip nastavnika
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email adresa
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Datum zaposlenja
            </label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mx-1"
              onClick={() => setModalIsOpen(false)}
            >
              Odustani
            </button>
            <button
              type="submit"
              className="bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] text-[#03294D] font-bold py-2 px-4 rounded-lg"
            >
              Dodaj
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
