import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const SearchBar: React.FC<SearchProps> = (props: SearchProps) => {
  const [searchEntry, setSearchEntry] = useState('');
  const [mechanicsSelections, setMechanicsSelections] = useState(['']);
  const [categoriesSelections, setCategoriesSelections] = useState(['']);
  const [itemsPerPage, setItemsPerPage] = useState('25');

  const mechanics = useSelector((state: RootState) => state.meccatReducer.mechanic);
  const categories = useSelector((state: RootState) => state.meccatReducer.category);

  useEffect(() => {
    mechanicsCheckboxMaker();
    categoriesCheckboxMaker();
  }, []);

  let mechanicsCheckboxes: React.ReactNodeArray = [<></>];
  let categoriesCheckboxes: React.ReactNodeArray = [<></>];

  const checkToggler = (type: string, value: string) => {
    switch (type) {
      case 'mechanics':
        const arraySearch = mechanicsSelections.indexOf(value);
        if (arraySearch > -1) {
          const output = mechanicsSelections;
          output.push(value);
          return setMechanicsSelections(output);
        } else {
          return setMechanicsSelections(mechanicsSelections.slice(arraySearch, arraySearch + 1));
        }
      case 'category':
        const arraySearch1 = categoriesSelections.indexOf(value);
        if (arraySearch1 > -1) {
          const output1 = categoriesSelections;
          output1.push(value);
          return setCategoriesSelections(output1);
        } else {
          return setCategoriesSelections(categoriesSelections.slice(arraySearch1, arraySearch1 + 1));
        }
      default:
        break;
    }
  };

  const mechanicsCheckboxMaker = () => {
    mechanicsCheckboxes = mechanics.map((option: Option, ind: number) => {
      return (
        <div key={`mechanic${ind}`}>
          <label htmlFor={`mechanic${ind}`}>{option.name}</label>
          <input
            type="checkbox"
            id={`mechanic${ind}`}
            value={option.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              checkToggler('mechanics', e.target.value);
              props.getAPIGames(searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
            }}>
            {option.name}
          </input>
        </div>
      );
    });
  };

  const categoriesCheckboxMaker = () => {
    categoriesCheckboxes = categories.map((option: Option, ind: number) => {
      return (
        <div key={`category${ind}`}>
          <label htmlFor={`category${ind}`}>{option.name}</label>
          <input
            type="checkbox"
            id={`category${ind}`}
            value={option.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              checkToggler('category', e.target.value);
              props.getAPIGames(searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage);
            }}>
            {option.name}
          </input>
        </div>
      );
    });
  };

  return (
    <aside id="searchComponentContainer">
      <div id="searchbarContainer">
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
          }}>
          <label htmlFor="titleDescriptionSearch">Search</label>
          <input
            id="titleDescriptionSearch"
            type="text"
            value={searchEntry}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchEntry(e.target.value)}
            placeholder="game title"></input>
          <button></button>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setItemsPerPage(e.target.value)}
            value={itemsPerPage}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </form>
      </div>
      <div id="checkboxContainer">
        <form id="mechanicsCheckboxes">{mechanicsCheckboxes}</form>
        <form id="categoriesCheckboxes">{categoriesCheckboxes}</form>
      </div>
    </aside>
  );
};

export default SearchBar;
