import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { CLIENT_ID } = process.env;

const SearchBar: React.ReactNode = () => {
    const [searchEntry, setSearchEntry] = useState('');
    const [mechanicsSelections, setMechanicsSelections]= useState([""]);
    const [categoriesSelections, setCategoriesSelections] = useState([""]);

    useEffect(()=> {
      mechanicsCheckboxMaker();

    }, [])
    type option = {
      id: string,
      name: string, 
      url:string
    }
    let mechanicsCheckboxes = (<></>);
    let categoriesCheckboxes = (<></>);

    const checkToggler = (type:string, value:string) => {
      switch(type) {
        case "mechanics":
          if (mechanicsSelections.indexOf(value)> -1)
          return
        case "category":
          return
        default:
          break
      }
    }

    const mechanicsCheckboxMaker = async () => {
        await axios
            .get(`https://api.boardgameatlas.com/api/game/mechanics?client_id=${CLIENT_ID}`)
            .then((res)=> {
                mechanicsCheckboxes = res.data.mechanics.map((option:option, ind:number) => {
                    return (<input type="checkbox" key={`mechanic${ind}`} value={option.id} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> checkToggler("mechanics", e.target.value)}>{option.name}</input>);
                });
            });
    };

    const categoriesCheckboxMaker = async() => {
      await axios
      .get(`https://api.boardgameatlas.com/api/game/categories?client_id=${CLIENT_ID}`)
      .then((res=> {
        categoriesCheckboxes = res.data.categories.map((option:option, ind:number)=> {
          return (<input type="checkbox" key={`category${ind}`} value={option.id} onClick={(e:React.ChangeEvent<HTMLInputElement>): => checkToggler("category",e.target.value)}>{option.name}</input>) })
        }))
      }; 

    return (
    <div id="checkboxContainer">
      <form id="mechanicsCheckboxes">
        {mechanicsCheckboxes}
      </form>
      <form id="categoriesCheckboxes">
        {categoriesCheckboxes}
      </form>
    </div>
    )
};

export default SearchBar;
