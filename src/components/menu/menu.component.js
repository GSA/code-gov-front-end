import React from 'react';


/* Need to handle internal urls, external urls, and drop down */
const PrimaryMenuOption = ({ menuOption }) => {
  const textContent = menuOption.name;
  if (menuOption.url) {
    return <a textContent={textContent} target="_blank"></a>;
  } else {
    return (
      <div textContent={textContent}></div>
    );
  }  
}

/* Need to handle internal urls and external urls */
const SecondaryMenuOption = ({ menuOption }) => {
  if (menuOption.links && menuOption.links.length > 0) {
    return (
      <ul>
        {menuOption.links.map(link => {
          <a
            textContent={link.name}
          ></a>
        })}
      </ul>
    );
  }
}

const MenuComponent = ({ navClass, navStyle, logo, menu, dropdownSearchBox, isSearchBoxShown }) => (
  <React.Fragment>
    <nav className={navClass} style={navStyle}>
      <mobile-menu-button></mobile-menu-button>
      
      <a className="svg-container" title="title + ' Home'" >
        <img src="logo" />
      </a>
      
      <ul>
        {menu.map(menuOption => {
          return (<React.Fragment>
            <PrimaryMenuOption menuOption={menuOption} />
            <SecondaryMenuOption menuOption={menuOption} />
          </React.Fragment>);
        })}
      </ul>

      <ul className="right">
        { dropdownSearchBox &&
          <li>
            <a className="no-underline">
              <i className="icon icon-search"></i>
            </a>
          </li>
        }
      </ul>
    </nav>

    {dropdownSearchBox &&
      <div className={'search-box' + (isSearchBoxShown && 'active')}>
        <a className="close-search-box-button">
          <i className="icon icon-cancel"></i>
        </a>
        <form className="search-form">
        </form>
      </div>
    }
  </React.Fragment>
);

export default MenuComponent;
