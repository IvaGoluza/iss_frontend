import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import SearchList from "../../components/SearchList";

export default function Home() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };
  const ljudi = [
    { id: 1, name: 'Perko perić', works: 'Nastavnik predmetne nastave' },
    { id: 2, name: 'Ivo perić', works: 'Nastavnik razredne nastave' },
    { id: 3, name: 'Marko perić', works: 'Nastavnik razredne nastave' },
    { id: 4, name: 'Svi perić', works: 'Nastavnik predmetne nastave' },
    { id: 5, name: 'Rođaci perić', works: 'Nastavnik predmetne nastave' },
  ];
  return (
    <div className="h-[92.5vh] md:px-16 px-8 grid grid-rows-1 pt-10 grid-cols-3 gap-6">
      <div className="col-span-2 bg-white rounded-xl h-4/5 border border-[#6AA2F6]">
        <div className="text-white bg-[#647CF6] rounded-t-[0.6rem] px-4 py-3 text-sm font-bold grid grid-rows-1 grid-cols-2">
          <span>Nastavni djelatnik</span>
          <span>Položaj</span>
        </div>
        <div className="flex flex-col px-4">
          {ljudi.map((man) => (
            <div className="grid grid-rows-1 grid-cols-2 bg-gradient-to-r from-[#DCDFF0] to-white px-3 font-semibold mt-1.5 rounded-xl">
              <span>{man.name}</span>
              <span className="relative">
                <div
                  className={`absolute -left-4 top-1.5 h-3 w-3 rounded-full bg-gradient-to-tr ${man.works.includes('predmetne') ? 'from-[#9F04E8] to-[#DB06FD]' : 'from-[#E949EC] to-[#FF6736]'}from-[#E949EC] to-[#FF6736] mr-2`}
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
            {' '}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              onChange={inputHandler}
              value={inputText}
              className="bg-transparent outline-none ml-2"
            />
          </div>
          {inputText !== '' && <SearchList data={ljudi} input={inputText}/>}
        </div>

        <div>
          <button className="w-full text-white font-semibold bg-gradient-to-tr hover:bg-gradient-to-tl from-[#9F04E8] to-[#DB06FD] rounded-xl py-3 text-sm px-2 mt-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Nastavnici predmetne
            nastave
          </button>
          <button className="w-full text-white font-semibold bg-gradient-to-tr hover:bg-gradient-to-tl from-[#E949EC] to-[#FF6736] rounded-xl py-3 text-sm px-2 my-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Nastavnici razredne
            nastave
          </button>
          <button className="w-full text-[#03294D] font-bold bg-gradient-to-tr hover:bg-gradient-to-tl  from-[#8DFC00] to-[#EAFD06] rounded-xl py-3 text-sm px-2">
            <FontAwesomeIcon icon={faUserPlus} /> Dodaj novog djelatnika
          </button>
        </div>
      </div>
    </div>
  );
}
