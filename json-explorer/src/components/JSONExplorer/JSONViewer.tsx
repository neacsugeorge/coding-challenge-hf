import clsx from 'clsx';
import styles from './JSONViewer.module.css';
import React from 'react';

function PropertyContents({
    path,
    pathKey,
    value,
    onChangePath,
}: {
    path: string,
    pathKey: string | number,
    value: unknown,
    onChangePath: (path: string) => void,
}) {
    const isIterable = (typeof value === 'object' && value);

    return (
        <div className={clsx(styles.property, {
            [styles.accessibleProperty]: !isIterable,
        })}>
            {typeof pathKey === 'string' ? (
                <>
                    <a onClick={() => {
                        if (isIterable) {
                            return;
                        }

                        onChangePath(path);
                    }}>{pathKey}</a>:&nbsp;
                </>
            ) : null}
            {!isIterable ? (
                <span>{typeof value === 'string' ? `'${value}'` : JSON.stringify(value)}</span>
            ) : (
                <>
                    <span>{Array.isArray(value) ? '[' : '{'}</span>
                    <div className={styles.indent}>
                        <IterablePropertyContents
                            path={path}
                            value={value}
                            onChangePath={onChangePath}
                        />
                    </div>
                    <span>{Array.isArray(value) ? ']' : '}'}</span>
                </>
            )}
            <span className={styles.comma}>,</span>
        </div>
    );
}
const PropertyContentsMemo = React.memo(PropertyContents);

function IterablePropertyContents({
    path,
    value,
    onChangePath,
}: {
    path: string,
    value: object,
    onChangePath: (path: string) => void,
}) {
    const entries = Object.entries(value || {});
    const isArray = Array.isArray(value);

    return (
        <>
            {entries.map(([key, value], index) => (
                <PropertyContentsMemo
                    key={key}
                    path={isArray ? `${path}[${index}]` : `${path}.${key}`}
                    pathKey={isArray ? index : key}
                    value={value}
                    onChangePath={onChangePath}
                />
            ))}
        </>
    );
}
const IterablePropertyContentsMemo = React.memo(IterablePropertyContents);

export default function JSONViewer({
    jsonData,
    className,
    onChangePath,
}: {
    jsonData: object,
    className?: string,
    onChangePath: (path: string) => void,
}) {
    return (
        <div className={clsx(styles.root, className)}>
            <div>Response</div>
            <div className={styles.content}>
                <IterablePropertyContentsMemo
                    path="res"
                    value={jsonData}
                    onChangePath={onChangePath}
                />
            </div>
        </div>
    );
}
