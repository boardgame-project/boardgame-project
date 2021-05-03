import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { CLIENT_ID } = process.env;

type searchProps = {
  getAPIGames:(searchEntry:string, mechanicsSelections:string[], categoriesSelections:string[], itemsPerPage:string)=> void
}

const SearchBar: React.FC<searchProps> = (props:searchProps) => {
    const [searchEntry, setSearchEntry] = useState('');
    const [mechanicsSelections, setMechanicsSelections]= useState([""]);
    const [categoriesSelections, setCategoriesSelections] = useState([""]);
    const [itemsPerPage, setItemsPerPage] = useState("25"); 

    type option = {
      id: string,
      name: string, 
      url:string
    }

    useEffect(()=> {
      mechanicsCheckboxMaker();
      categoriesCheckboxMaker();
    }, [])

    let mechanicsCheckboxes = (<></>);
    let categoriesCheckboxes = (<></>);

    const checkToggler = (type:string, value:string) => {
      switch(type) {
        case "mechanics":
          const arraySearch = mechanicsSelections.indexOf(value)
          if (arraySearch > -1) {
            const output = mechanicsSelections; 
            output.push(value)
            return setMechanicsSelections(output);
          } else {
            return setMechanicsSelections(mechanicsSelections.slice(arraySearch,arraySearch+1))
          }
        case "category":
          const arraySearch1 = categoriesSelections.indexOf(value)
          if (arraySearch1 > -1) {
            const output1 = categoriesSelections;
            output1.push(value)
            return setCategoriesSelections(output1);
          } else {
            return setCategoriesSelections(categoriesSelections.slice(arraySearch1,arraySearch1+1))
          }
        default:
          break
      }
    };

    const mechanicsCheckboxMaker = async () => {
      await axios
          .get(`https://api.boardgameatlas.com/api/game/mechanics?client_id=${CLIENT_ID}`)
          .then((res)=> {
            mechanicsCheckboxes = res.data.mechanics.map((option:option, ind:number) => {
              return (
              <div key={`mechanic${ind}`}>
              <label htmlFor={`mechanic${ind}`}>{option.name}</label>
              <input type="checkbox" id={`mechanic${ind}`} value={option.id} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                checkToggler("mechanics", e.target.value)
                props.getAPIGames(searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage)
              }}>{option.name}</input>
              </div>);
            });
          });
        };

    const categoriesCheckboxMaker = async() => {
      await axios
      .get(`https://api.boardgameatlas.com/api/game/categories?client_id=${CLIENT_ID}`)
      .then((res)=> {
        categoriesCheckboxes = res.data.categories.map((option:option, ind:number)=> {
          return (
          <div key={`category${ind}`}>
          <label htmlFor={`category${ind}`}>{option.name}</label>
          <input type="checkbox"  id={`category${ind}`} value={option.id} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            checkToggler("category",e.target.value)
            props.getAPIGames(searchEntry, mechanicsSelections, categoriesSelections, itemsPerPage)
          }}>{option.name}</input>
          </div>);
        }); 
      })
    }; 

    return (
    <aside id="searchComponentContainer">
      <div id="searchbarContainer">
        <form onSubmit={(e:React.SyntheticEvent)=> {
          e.preventDefault();
        }}>
          <label htmlFor="titleDescriptionSearch">Search</label>
          <input id="titleDescriptionSearch" type='text' value={searchEntry} onChange={(e:React.ChangeEvent<HTMLInputElement> )=> setSearchEntry(e.target.value)} placeholder="game title"></input>
          <button></button>
          <select onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setItemsPerPage(e.target.value)} value={itemsPerPage}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </form>
      </div>
      <div id="checkboxContainer">
        <form id="mechanicsCheckboxes">
          {mechanicsCheckboxes}
        </form>
        <form id="categoriesCheckboxes">
          {categoriesCheckboxes}
        </form>
      </div>
    </aside>
    )
};

export default SearchBar;
