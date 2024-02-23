import React, { useState, useEffect } from 'react';
import estilos from './menuReact.module.css';
import { IconHome, IconContact, IconCatalogo, IconServices, IconNosotros } from './icons/IconHome';

const menu = [

  {
    title: 'Inicio',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Nosotros',
    icon: 'us',
    link: '/nosotros',
  },
  {
    title: 'Servicios',
    icon: 'services',
    link: '/servicios2',
  },
  {
    title: 'Contacto',
    icon: 'contact',
    link: '/contacto',
  },
  {
    title: 'Catálogo',
    icon: 'catalogo',
    link: '/catalogo',
  },
]

const MenuReact = () => {
  const [currentPage, setCurrentPage] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentPage(window.location.pathname)
  }, [])

  return (
    <div className="grid w-96 md:w-auto m-auto grid-cols-3 md:flex md:flex-col gap-0 md:gap-0">
      {menu && menu.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className={`${estilos.mena} ${currentPage === item.link ? estilos.david : ''}`}
        >
          <div className={estilos.menadiv} style={{ marginLeft: '1rem', display: 'flex' }}>{item.title}</div>
          <div style={{ display: 'flex', flex: '1', justifyContent: 'end', marginRight: '1rem' }}>
            {item.icon === 'us' && <IconHome />}
            {item.icon === 'home' && <IconNosotros />}
            {item.icon === 'services' && <IconServices />}
            {item.icon === 'contact' && <IconContact />}
            {item.icon === 'catalogo' && <IconCatalogo />}
          </div>
        </a>
      ))}
    </div>
  );
};

export default MenuReact;



