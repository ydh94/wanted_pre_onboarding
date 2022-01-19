import React from 'react';
import './Navbar.css';
import { menu, menuSM } from '../data/menudata';
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons';

const Navbar = (props) => {
  const renderMenuSM = menuSM.map((list, index) => (
    <li className='menuClass' key={index}>
      <a href='/'>{list.category}</a>
    </li>
  ));

  const renderMenu = menu.map((list, index) => (
    <li className='menuClass' key={index}>
      <a href='/'>{list.category}</a>
      {list.img !== '' && <img src={`${list.img}`} alt='' className='menuSvg' />}
    </li>
  ));

  const onShowCategory = () => {
    console.log('show category');
  };

  return (
    <div className='navbarSection'>
      <div className='navbar'>
        <section className='left'>
          <button className='jobCategoryButton' onClick={onShowCategory}>
            <img className='menuIcon' alt='menuIcon' src='https://static.wanted.co.kr/images/icon-menu.png' />
          </button>
          <a href='/'>
            <span className='home'>wanted</span>
          </a>
        </section>

        <ul className='menu'>{renderMenu}</ul>

        <aside className='asideMenu'>
          <li className='searchMenu'>
            <SearchOutlined />
          </li>
          <li className='userMenu'>
            <button className='login'>회원가입/로그인</button>
          </li>
          <li className='dashboard'>
            <div className='divider' />
            <button className='dashboardButton'>기업 서비스</button>
          </li>
        </aside>

        <aside className='userMenuS'>
          <button className='dashboardButtonS'>회원가입하기</button>
        </aside>
      </div>

      <section className='navbarS'>
        <ul className='menuS'>{renderMenu}</ul>
        <ul className='menuSM'>{renderMenuSM}</ul>
        <aside className='navbarS_search'>
          <a href='/'>
            <SearchOutlined style={{ fontSize: '20px' }} />
          </a>
          <a href='/'>
            <EllipsisOutlined style={{ fontSize: '32px', marginLeft: '20px' }} />
          </a>
        </aside>
      </section>
    </div>
  );
};

export default Navbar;
