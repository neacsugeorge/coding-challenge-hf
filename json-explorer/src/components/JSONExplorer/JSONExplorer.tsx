import {useEffect, useState} from 'react';
import JSONPropertyInput from './JSONPropertyInput';
import JSONViewer from './JSONViewer';

import styles from './JSONExplorer.module.css';

export default function JSONExplorer({
    json,
}: {
    json?: string,
}) {
    const [parsedData, setParsedData] = useState(null);
    const [error, setError] = useState('');
    const [path, setPath] = useState('res.fields[0].id');

    useEffect(() => {
        try {
            const data = JSON.parse(json);
            setParsedData(data);
            setError('');
        }
        catch {
            setError('Cannot parse json');
        }
    }, [json]);

    return (
        <div>
            {error ? (
                <span className={styles.error}>
                    {error}
                </span>
            ) : null}
            <JSONPropertyInput
                jsonData={parsedData}
                path={path}
                onChange={setPath}
            />
            <JSONViewer
                jsonData={parsedData}
                className={styles.viewer}
                onChangePath={setPath}
            />
        </div>
    );
}
