import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { routes } from '../../api/paths';

export default function Navbar() {
  const [active, setActive] = useState<string>(routes.DJELATNICI);

  return (
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold h-14 grid grid-rows-1 grid-cols-4 md:grid-cols-6 md:px-16 px-8 items-center">
      <Link
        key={nanoid()}
        to={routes.DJELATNICI}
        onClick={() => setActive(routes.DJELATNICI)}
      >
        {' '}
        DJELATNICI
      </Link>
      <Link
        key={nanoid()}
        to={routes.AKTIVI}
        onClick={() => setActive(routes.AKTIVI)}
      >
        {' '}
        AKTIVI
      </Link>
      <Link
        key={nanoid()}
        to={routes.SJEDNICE}
        onClick={() => setActive(routes.SJEDNICE)}
      >
        {' '}
        SJEDNICE
      </Link>
      <Link
        key={nanoid()}
        to={routes.NASTAVNE_GODINE}
        onClick={() => setActive(routes.NASTAVNE_GODINE)}
      >
        {' '}
        NASTAVNE GODINE
      </Link>
    </div>
  );
}
