import {useState} from 'react';
import './App.css';
import JSONExplorer from './components/JSONExplorer';

const DEFAULT_JSON = `
{
    "date":"2021-10-27T07:49:14.896Z",
    "hasError":false,
    "fields":[
        {
            "id":"4c212130",
            "prop":"iban",
            "value":"DE81200505501265402568",
            "hasError":false
        }
    ]
}
`;

function App() {
    const [json, setJSON] = useState(DEFAULT_JSON);

    return (
        <>
            <h1>JSON Explorer</h1>
            <div>
                <input
                    type="file"
                    accept='application/json'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files?.[0];
                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            setJSON(reader.result as string);
                        }, false);
                        if (file) {
                            reader.readAsText(file);
                        }
                    }}
                />
                <JSONExplorer json={json}/>
            </div>
        </>
    );
}

export default App;
