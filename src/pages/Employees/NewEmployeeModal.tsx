import React, { useState } from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import axios from 'axios';
import { EmployeeType } from './Employees';

interface NewEmployeeModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
}

type NewEmployee = {
  name: string;
  email: string;
  dateStart: string;
  position: string;
};

const initialValues: NewEmployee = {
  name: '',
  email: '',
  dateStart: '',
  position: '',
};

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Ime je obvezno.'),
  email: Yup.string()
    .required('Email je obvezan.')
    .email('Email adresa nije valjana.'),
  dateStart: Yup.string().required('Datum je obvezan.'),
  position: Yup.string().required('Radna pozicija je obvezna.'),
});

export default function NewEmployeeModal({
  modalIsOpen,
  setModalIsOpen,
  setEmployees,
  setFilteredEmployees,
}: NewEmployeeModalProps) {
  const [serverError, setServerError] = useState<string>('');
  const [formData, setFormData] = useState<NewEmployee>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<NewEmployee>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      await ValidationSchema.validate(formData, { abortEarly: false });
      const response = await axios.post(
        'http://localhost:8080/employee/create',
        formData
      );
      console.log('Uspješno poslano:', response.data);
      const newEmpl = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        dateEnd: response.data.dateEnd,
        dateStart: response.data.dateStart,
        position: response.data.position,
        aktivName: response.data.aktivName,
      };
      setFilteredEmployees((prevEmployees) => [
        ...prevEmployees,
        response.data,
      ]);
      console.log('hi', newEmpl);
      setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      console.log('hi');
      setFormData(initialValues);
      console.log(formData);
      setFormErrors({});
      setModalIsOpen(false);
      console.log(modalIsOpen);
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) {
        const errors: Partial<NewEmployee> = {};
        error.inner.forEach((err) => {
          if (!errors[err.path]) {
            errors[err.path] = err.message;
          }
        });
        setFormErrors(errors);
      } else {
        setServerError('Nešto je pošlo po zlu. Molimo pokušajte ponovo.');
      }
    }
  };
  return (
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
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tip nastavnika
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
          {formErrors.position && (
            <p className="text-red-500 text-sm">{formErrors.position}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email adresa
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Datum zaposlenja
          </label>
          <input
            type="date"
            name="dateStart"
            value={formData.dateStart}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
          {formErrors.dateStart && (
            <p className="text-red-500 text-sm">{formErrors.dateStart}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mx-1"
            onClick={() => {
              setModalIsOpen(false);
              setFormData(initialValues);
              setFormErrors({});
            }}
          >
            Odustani
          </button>
          <button
            type="button"
            className="bg-gradient-to-tr hover:bg-gradient-to-tl from-[#8DFC00] to-[#EAFD06] text-[#03294D] font-bold py-2 px-4 rounded-lg"
            onClick={onSubmit}
          >
            Dodaj
          </button>
        </div>
      </form>
    </Modal>
  );
}
