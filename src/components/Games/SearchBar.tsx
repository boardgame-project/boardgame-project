import { SearchProps, Option } from 'customTypes';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Button from '../StyledComponents/Button';

const SearchBar: React.FC<SearchProps> = (props: SearchProps) => {
  const [searchEntry, setSearchEntry] = useState('');
  const [mechanicsSelections, setMechanicsSelections] = useState<string[]>([]);
  const [categoriesSelections, setCategoriesSelections] = useState<string[]>([]);
  const [mechanicsCheckboxes, setMechanicsCheckboxes] = useState([<></>]);
  const [categoriesCheckboxes, setCategoriesCheckboxes] = useState([<></>]);
  const [itemsPerPage, setItemsPerPage] = useState<string>('25');
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollTrigger, setScrollTrigger] = useState(false);

  const mechanics = useSelector((state: RootState) => state.meccatReducer.mechanic);
  const categories = useSelector((state: RootState) => state.meccatReducer.category);

  useEffect(() => {
    mechanicsCheckboxMaker();
    categoriesCheckboxMaker();
  }, [mechanics, categories]);

  useEffect(() => {
    props.getAPIGames(currentPage, searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    props.getAPIGames(currentPage, searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 900) {
        setScrollTrigger(true);
      } else {
        setScrollTrigger(false);
      }
    });
  }, []);

  const checkToggler = (type: string, value: string) => {
    switch (type) {
      case 'mechanics':
        const arraySearch = mechanicsSelections.indexOf(value);
        if (arraySearch === -1) {
          const output = mechanicsSelections;
          output.push(value);
          return setMechanicsSelections(output);
        } else {
          const output = mechanicsSelections;
          output.splice(arraySearch, 1);
          return setMechanicsSelections(output);
        }
      case 'category':
        const arraySearch1 = categoriesSelections.indexOf(value);
        if (arraySearch1 === -1) {
          const output = categoriesSelections;
          output.push(value);
          return setCategoriesSelections(output);
        } else {
          const output = categoriesSelections;
          output.splice(arraySearch1, 1);
          return setCategoriesSelections(output);
        }
      default:
        break;
    }
  };

  const mechanicsCheckboxMaker = () => {
    const output = mechanics.map((option: Option, ind: number) => {
      return (
        <div className="checkboxDiv" key={`mechanic${ind}`}>
          <input
            type="checkbox"
            id={`mechanic${ind}`}
            value={option.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              checkToggler('mechanics', e.target.value);
              props.getAPIGames(currentPage, searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
            }}></input>
          <label className="checkLabel" htmlFor={`mechanic${ind}`}>
            {option.name}
          </label>
        </div>
      );
    });
    setMechanicsCheckboxes(output);
  };

  const categoriesCheckboxMaker = () => {
    const output = categories.map((option: Option, ind: number) => {
      return (
        <div className="checkboxDiv" key={`category${ind}`}>
          <input
            type="checkbox"
            id={`category${ind}`}
            value={option.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              checkToggler('category', e.target.value);
              props.getAPIGames(currentPage, searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
            }}></input>
          <label className="checkLabel" htmlFor={`category${ind}`}>
            {option.name}
          </label>
        </div>
      );
    });
    setCategoriesCheckboxes(output);
  };

  return (
    <aside id="searchComponentContainer">
      <form
        id="searchForm"
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          props.getAPIGames(currentPage, searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
          setSearchEntry('');
        }}>
        <label id="titleDescriptionSearchLabel" htmlFor="titleDescriptionSearch">
          Search
        </label>
        <input
          id="titleDescriptionSearch"
          type="text"
          value={searchEntry}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchEntry(e.target.value)}
          placeholder="game title"></input>
        <Button>Search</Button>
        <select
          id="itemsPerPageSelector"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setItemsPerPage(e.target.value);
          }}
          value={itemsPerPage}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
        results/page
      </form>
      <div id="checkboxContainer">
        <div id="checkboxSubContainer">
          <section className="mecCatContainer">
            <h6> Mechanics</h6>
            <form className="mecCatCheckboxes">{mechanicsCheckboxes}</form>
          </section>
          <section className="mecCatContainer">
            <h6>Categories</h6>
            <form className="mecCatCheckboxes">{categoriesCheckboxes}</form>
          </section>
        </div>
        <div className={scrollTrigger ? 'stickyArrows' : 'noStickyArrows'} id="arrowBox">
          <svg
            className={scrollTrigger ? 'pageArrowS' : 'pageArrowNS'}
            onClick={() => (currentPage > 0 ? setCurrentPage(currentPage - 1) : null)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          </svg>
          <div id="currentPageIndicator">
            Current Page = <strong>{currentPage + 1}</strong>
          </div>
          <svg
            className={scrollTrigger ? 'pageArrowS' : 'pageArrowNS'}
            onClick={() => setCurrentPage(currentPage + 1)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default SearchBar;
