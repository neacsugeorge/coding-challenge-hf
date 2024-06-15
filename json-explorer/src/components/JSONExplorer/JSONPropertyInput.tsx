import {useCallback} from 'react';
import {previewValueAtPath} from './utils';

import styles from './JSONPropertyInput.module.css';

export default function JSONPropertyInput({
    path = '',
    onChange,
    jsonData,
}: {
    path: string,
    onChange: (path: string) => void,
    jsonData: object,
}) {
    const inputChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.value);
    }, [onChange]);

    const pathValue = previewValueAtPath(jsonData, path);

    return (
        <div className={styles.root}>
            <label>
                Property
                <input
                    type="text"
                    value={path}
                    onChange={inputChange}
                    className={styles.input}
                />
            </label>
            <div className={styles.result}>{pathValue}</div>
        </div>
    );
}