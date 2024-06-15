import lodashGet from 'lodash.get';

export function previewValueAtPath(jsonData: object, path: string): string {
    if (!path.startsWith('res')) {
        return 'undefined';
    }

    // Remove res prefix
    path = path.slice('res'.length);

    // Differentiate between res.field and res['field']
    if (path.startsWith('.')) {
        path = path.slice(1);
    }

    // I could attempt to write my own implementation if needed
    let value = lodashGet(jsonData, path, 'undefined');

    // In video we displayed undefined for objects/arrays
    if (typeof value === 'object' && value) {
        value = 'undefined';
    }

    // Edge case (res.date.toString)
    if (typeof value === 'function') {
        value = 'undefined';
    }

    // Should we consider handling empty string?
    if (value === '') {
        value = '\'\'';
    }

    return value.toString();
}
