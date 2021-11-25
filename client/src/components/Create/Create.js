import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

//Redux actions
import { postPokemon, setLoading } from "../../actions";
import { capitalLetter, isValidHttpUrl } from "../../Utils/Methods";

//Stylesheets
import Style from "./Create.module.css";
import Button from "../Styles/typeButtons.module.css";
import Container from "../Styles/Container.module.css";
import { img } from "../Card/Card.module.css";
//Loading fallback components
import LoadingImg from "../Loading/LoadingImg.js";
import Loading from "../Loading/Loading";

export function Create({ types, postPokemon, setLoading, isLoading }) {
  let history = useHistory();
  const [info, setInfo] = useState({
    name: "",
    types: [],
    imgUrl: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
  });

  //ComponentDidMount - Request random pokemon info to extract imgUrl
  useEffect(() => {
    const imgLoad = new Promise((resolve, reject) => {
      let id = Math.floor(Math.random() * 152) + 1;
      try {
        resolve(axios.get(`/pokemons/${id}`));
      } catch (e) {
        reject(e);
      }
    });

    imgLoad
      .then((response) => response.data)
      .then((data) => data[0].imgUrl)
      .then((imgUrl) =>{
        setInfo((i) => {
          return {
            ...i,
            imgUrl: imgUrl,
          };
        })
        setLoading(false)}
      )
      .catch((e) => alert(e));
  }, [setLoading]);

  const loadImgUrl = async () => {
    let id = Math.floor(Math.random() * 152) + 1;

    let randomImg = await axios.get(`/pokemons/${id}`);

    setInfo({
      ...info,
      imgUrl: randomImg.data[0].imgUrl,
    });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let id = event.target.id;

    if (id === "types") {
      //Types input. Adds selected types, max. 2 types.
      if (!info.types.includes(value.toLowerCase()) && info.types.length < 2) {
        setInfo({
          ...info,
          types: [...info.types, value.toLowerCase()],
        });
      } else if (info.types.length === 2) {
        alert("Plase select up to 2 types");
      }
    } else {
      if (id === "name") {
        //User can only type letters a-z case insensitive
        value = value.match(/[a-z]/gi)
          ? capitalLetter(value.match(/[a-z]/gi).join(""))
          : "";
        if (value && value.length > 20) {
          alert("Max 20 characters");
          value = info.name;
        }
      } else if (id !== "imgUrl") {
        value = value.match(/\d/g) ? value.match(/\d/g).join("") : "";
      }
      setInfo({
        ...info,
        [id]: value,
      });
    }
  };

  const handleClick = (event) => {
    let value = event.target.value;

    //Types input. Adds selected types, max. 2 types.
    if (!info.types.includes(value.toLowerCase()) && info.types.length < 2) {
      setInfo({
        ...info,
        types: [...info.types, value.toLowerCase()],
      });
    } else if (info.types.includes(value.toLowerCase())) {
      let filter = info.types.filter((t) => t !== value.toLowerCase());
      setInfo({
        ...info,
        types: [...filter],
      });
    } else if (info.types.length === 2) {
      alert("Plase select up to 2 types");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // let {name, types,  imgUrl, height, weight, hp, attack, defense,
    //     speed } = info;
    let emptyFields = [];
    for (let field in info) {
      if (info[field] === "" || info[field].length === 0) {
        emptyFields.push(field);
      }
    }

    if (emptyFields.length > 0) {
      let message = "";
      for (let i = 0; i < emptyFields.length; i++) {
        message = message + emptyFields[i] + ", ";
      }
      message = `All fields required. Missing values: ${message}`;

      alert(message);
    } else {
      setLoading(true);
      let createdPokemon = await postPokemon(info);

      if (createdPokemon === "failed") {
        alert("Pokemon already exists. Please change your pokemon's name");
      } else {
        setInfo({
          name: "",
          types: [],
          imgUrl: "",
          height: "",
          weight: "",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
        });
        setLoading(false);
        history.push("/pokemons"); //After creating the new pokemon, returns to /pokemons
      }
    }

    //Pendiente validar que todos los campos esten completos
    //Poner la primera en mayuscula al nombre
    //Pendiente cambiar tipos en el boton close
  };

  const handleOnBlur = async (event) => {
    let id = event.target.id;

    if (info[id] === "") {

      document.getElementById(id).className = document.getElementById(id).className.split(" ")[0].concat(` ${Style.invalidInput}`);
      document.getElementById(id).placeholder = "Required field";
    } else if (info[id] === "0") {
      document.getElementById(id).className = document.getElementById(id).className.split(" ")[0].concat(` ${Style.invalidInput}`);
      document.getElementById(id).placeholder =
        "Please type a number greater than 0";
    } else {
      
      document.getElementById(id).className = document.getElementById(id).className.split(" ")[0].concat(` ${Style.validInput}`);
      document.getElementById(id).placeholder = "";
    }
  };

  const quitType = (type) => {
    //Allows the user to change selected types
    setInfo({
      ...info,
      types: info.types.filter((t) => t !== type.toLowerCase()),
    });
  };

  return !isLoading ? (
    <div className={Container.Detail}>
      <h1 className={Style.Title}>Create Pokemon</h1>

      <div className={[Container.imgDetail, Style.imgDiv].join(" ")}>
        {isValidHttpUrl(info.imgUrl) ? (
          <img id="createImg" className={Style.Img} src={info.imgUrl} alt="imgUrl" />
        ) : (
          <LoadingImg />
        )}
      </div>

      <div className={Style.name}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="name">Name</label>
          <input
          
          className={Style.Input}
            tabIndex="1"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="name"
            value={info.name}
          />
        </div>

        <label
          className={Style.alertLabel}
          htmlFor="name"
          id="alertname"
        ></label>
      </div>

      <div className={[Style.types, Style.Dropdown].join(" ")}>
        <p tabIndex="2">Select types &darr;</p>

        <div className={Style.DropdownContent}>
          {/* <select  onChange={(e)=>{handleChange(e)}} id="types" value={info.types}>
                            <option key={`optionDefault`} value="" ></option>   
                            {
                                types && types.map(t=>{
                                    return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                                })
                            }
                        </select> */}

          {types &&
            types.map((t) => {
              return (
                <option
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  className={[
                    Button[capitalLetter(t.name)],
                    Button.simple,
                  ].join(" ")}
                  key={`option${t.name}`}
                  value={capitalLetter(t.name)}
                >
                  {capitalLetter(t.name)}
                </option>
              );
            })}
        </div>
      </div>
      <div className={Style.SelectedTypes}>
        {info.types.map((t) => {
          t = capitalLetter(t);
          return (
            <div
              key={`tag${t}`}
              className={[Button[t], Button.Div, Style.TypeTag].join(" ")}
            >
              <span>{t}</span>
              <button
                onClick={() => quitType(t)}
                className={Button.closeButton}
              >
                X
              </button>
            </div>
          );
        })}
      </div>

      <div className={Style.url}>
        <div className={Style.InputDiv}>
        <label className={Style.BorderLabel} htmlFor="imgUrl">Img URL</label>
        <input
        className={Style.Input}
          tabIndex="9"
          autoComplete="off"
          onChange={(e) => {
            handleChange(e);
          }}
          type="url"
          id="imgUrl"
          value={info.imgUrl}
        />
        <button
          tabIndex="10"
          form="null"
          className={Button.Important}
          onClick={(e) => {
            loadImgUrl(e);
          }}
          id="refreshImg"
        >
          New img
        </button>
        </div>
        
        
      </div>
      <div className={Style.height}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="height">Height </label>
          <input
          className={Style.Input}
            tabIndex="3"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="height"
            value={info.height}
          />
        </div>

        <label
          className={Style.alertLabel}
          htmlFor="name"
          id="alertheight"
        ></label>
      </div>
      <div className={Style.weight}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="weight">Weight </label>
          <input
          className={Style.Input}
            tabIndex="4"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="weight"
            value={info.weight}
          />
        </div>

        <label
          className={Style.alertLabel}
          htmlFor="name"
          id="alertweight"
        ></label>
      </div>
      <div className={Style.hp}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="hp">HP </label>
          <input
          className={Style.Input}
            tabIndex="5"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="hp"
            value={info.hp}
          />
        </div>

        <label className={Style.alertLabel} htmlFor="name" id="alerthp"></label>
      </div>
      <div className={Style.attack}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="attack">Attack </label>
          <input
          className={Style.Input}
            tabIndex="6"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="attack"
            value={info.attack}
          />
        </div>

        <label
          className={Style.alertLabel}
          htmlFor="name"
          id="alertattack"
        ></label>
      </div>
      <div className={Style.defense}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="defense">Defense </label>
          <input
          className={Style.Input}
            tabIndex="7"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="defense"
            value={info.defense}
          />
        </div>

        <label
          className={Style.alertLabel}
          htmlFor="name"
          id="alertdefense"
        ></label>
      </div>
      <div className={Style.speed}>
        <div className={Style.InputDiv}>
          <label className={Style.BorderLabel} htmlFor="speed">Speed </label>
          <input
          className={Style.Input}
            tabIndex="8"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
            }}
            onBlur={(e) => handleOnBlur(e)}
            type="text"
            id="speed"
            value={info.speed}
          />
        </div>

        <label
          className={Style.alertLabel}
          htmlFor="name"
          id="alertspeed"
        ></label>
      </div>

      <button
        tabIndex="11"
        className={[Style.submitButton, Button.Submit].join(" ")}
        form="null"
        onClick={(e) => {
          handleSubmit(e);
        }}
        id="submit"
      >
        Submit
      </button>
    </div>
  ) : (
    <Loading />
  );
}

const mapStateToProps = (state) => {
  return {
    types: state.types,
    isLoading: state.loading,
  };
};

export default connect(mapStateToProps, { setLoading, postPokemon })(Create);
