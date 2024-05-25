import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faTrashCan,
  faTableList,
  faCaretLeft,
  faCaretRight,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

// Postavljanje modala na korijen aplikacije
Modal.setAppElement('#root');

const EmployeePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="p-10 pr-0 lg:w-[60%] bg-gradient-to-br from-[#BEE5FD] to-[#F5FCFF] rounded-xl m-auto mt-14 relative border border-1 border-cyan-500">
        <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text uppercase col-span-3 mb-3">
          djelatnik info
        </h1>
        <div className="grid grid-cols-2 grid-rows-3">
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Ime i prezime djelatnika
            </p>{' '}
            <input className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2" />
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Email adresa
            </p>{' '}
            <input className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2" />
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Početak radnog odnosa
            </p>{' '}
            <input
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
              type={'date'}
            />
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Tip nastavnika
            </p>{' '}
            <input className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2" />
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">
              Kraj radnog odnosa
            </p>{' '}
            <input
              className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2"
              type={'date'}
            />
          </div>
          <div className="my-1">
            {' '}
            <p className="font-bold text-[#003362] text-sm">Aktiv</p>{' '}
            <input className="w-[90%] bg-white text-slate-900 rounded-lg shadow-lg outline-none p-2" />
          </div>
        </div>
        <div className="flex flex-row justify-end text-white font-bold text-sm mt-10 mr-10">
          <button className="bg-gradient-to-tr hover:bg-gradient-to-tl  from-[#43C722] to-[#3DF310] rounded-lg px-5 py-2 mx-1 shadow-xl">
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-1" />
            Spremi
          </button>
          <button className="px-5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#C72222] to-[#F60404] rounded-lg mx-1 shadow-xl">
            <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
            Obriši
          </button>
        </div>

        <button className="absolute -left-16 top-[45%] bg-gradient-to-r hover:bg-gradient-to-tr from-cyan-500 to-blue-500 px-4 py-1 rounded-lg shadow-xl border">
          <FontAwesomeIcon icon={faCaretLeft} className="text-3xl text-white" />
        </button>
        <button className="absolute -right-16 top-[45%] bg-gradient-to-r hover:bg-gradient-to-tr from-cyan-500 to-blue-500 px-4 py-1 rounded-lg shadow-xl">
          <FontAwesomeIcon
            icon={faCaretRight}
            className="text-3xl text-white"
          />
        </button>
      </div>
      <img
        className="rotate-180 transform w-full"
        src="../../../assets/svgs/wave.svg"
        alt="wave"
      />
      <div className="w-full bg-gradient-to-b from-[#647CF6] to-[#ACB9FA] min-h-screen flex flex-col items-center pt-5">
        <div className="flex flex-row">
          <h1 className="text-xl lg:text-3xl font-extrabold text-white mr-10 md:mr-24">
            PREDMETI DJELATNIKA PERKO PERIĆ
          </h1>
          <button
            className="text-white bg-transparent border border-white font-semibold text-sm rounded-xl px-3 py-1 hover:border-2"
            onClick={openModal}
          >
            Dodaj novi predmet
          </button>
        </div>
        <div className="py-4 w-full flex flex-col items-center">
          <div className="grid grid-cols-9 text-center grid-rows-1 text-white font-semibold items-center justify-items-center py-2 lg:w-3/4 m-1 rounded-2xl pt-5">
            <p>#</p>
            <p className="col-span-2">Naziv</p>
            <p>Razred</p>
            <p>Tjedni broj sati</p>
            <p className="col-span-2">Status plana rada</p>
          </div>
          <div className="grid grid-cols-9 grid-rows-1 text-[#003362] font-bold bg-white items-center justify-items-center py-2 lg:w-3/4 m-2 rounded-2xl">
            <p>1</p>
            <p className="col-span-2">Matematika</p>
            <p>1.</p>
            <p>5</p>
            <p className="col-span-2">Odobren</p>
            <div className="co-span-2 flex flex-row justify-items-center w-full">
              <div className="mx-1.5 text-white bg-gradient-to-tr hover:bg-gradient-to-tl from-[#E949EC] to-[#FF6736] p-1 rounded-lg border border-[#B833BA]">
                <FontAwesomeIcon icon={faTableList} className="mx-1" />
              </div>
              <div className="mx-1.5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] p-1 rounded-lg border border-[#03294D]">
                <FontAwesomeIcon icon={faPenToSquare} className="mx-1" />
              </div>
              <div className="mx-1.5 bg-gradient-to-tr hover:bg-gradient-to-tl from-[#C72222] to-[#F60404] text-white text-sm p-1.5 rounded-lg border border-[#941717]">
                <FontAwesomeIcon icon={faTrashCan} className="mx-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-xl shadow-lg py-10 px-16 max-w-md mx-auto mt-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Dodaj novi predmet</h2>
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Naziv
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Razred
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tjedni broj sati
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mx-1"
              onClick={closeModal}
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
};

export default EmployeePage;
