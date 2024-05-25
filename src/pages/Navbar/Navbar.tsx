import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { routes } from '../../api/paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [active, setActive] = useState<string>(routes.DJELATNICI);

  return (
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold h-14 grid grid-rows-1 grid-cols-4 md:grid-cols-8 md:px-16 px-8 items-center">
      <div className="flex flex-row col-span-2">
        <FontAwesomeIcon icon={faGraduationCap} className="text-3xl" />
        <p className="text-2xl text-transparent bg-gradient-to-b from-white from-50% to-[#8DFC00] bg-clip-text">
          Školadmin
        </p>
      </div>
      <Link
        key={nanoid()}
        to={routes.DJELATNICI}
        onClick={() => setActive(routes.DJELATNICI)}
      >
        {' '}
        <p
          className={
            active === routes.DJELATNICI ? 'text-[#8DFC00]' : 'text-white'
          }
        >
          DJELATNICI
        </p>
      </Link>
      <Link
        key={nanoid()}
        to={routes.AKTIVI}
        onClick={() => setActive(routes.AKTIVI)}
      >
        {' '}
        <p
          className={active === routes.AKTIVI ? 'text-[#8DFC00]' : 'text-white'}
        >
          AKTIVI
        </p>
      </Link>
      <Link
        key={nanoid()}
        to={routes.SJEDNICE}
        onClick={() => setActive(routes.SJEDNICE)}
      >
        {' '}
        <p
          className={
            active === routes.SJEDNICE ? 'text-[#8DFC00]' : 'text-white'
          }
        >
          SJEDNICE
        </p>
      </Link>
      <Link
        key={nanoid()}
        to={routes.NASTAVNE_GODINE}
        onClick={() => setActive(routes.NASTAVNE_GODINE)}
      >
        {' '}
        <p
          className={
            active === routes.NASTAVNE_GODINE ? 'text-[#8DFC00]' : 'text-white'
          }
        >
          NASTAVNE GODINE
        </p>
      </Link>
    </div>
  );
}
