import { useEffect, useState } from "react";
import './autocomplete.css';
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

interface AutoCompleteProps {
    userInput: string,
    clickHandler: (id: string) => void;
}

export default function AutoComplete(props: AutoCompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const  [visible, setVisible] = useState(false);

  const { userInput, clickHandler } = props;
  const countryList = useSelector((state: RootState) => state.countries.value);

  const itemClickHandler = (suggestion: string) => {
    clickHandler(suggestion);
    setVisible(false);
  };

  // form the filtered list of suggestions based on input string
  useEffect(() => {
    if (userInput) {
        const filteredSuggestions = countryList.filter(
            (suggestion: string) =>
              suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          );
  setSuggestions(filteredSuggestions);  
  setVisible(true); 
  setSearch(userInput);
    }
  }, [userInput, countryList]);

  return (
    <div>
    {search && visible ? (
        suggestions.length ? (
            <div className="list-block">
                {suggestions?.map((suggestion) => (
                    <div className="item" key={suggestion} onClick={() => itemClickHandler(suggestion)}>
                        {suggestion}
                    </div>
                ))}
            </div>
        ) : (
            <div>No suggestions available.</div>
        )
    )  : (
        <></>
    )
    }
    </div>
  );
}