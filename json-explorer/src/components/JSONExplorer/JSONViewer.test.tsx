import {render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';
import JSONViewer from './JSONViewer';
import userEvent from '@testing-library/user-event';

describe('JSONViewer', () => {
    const jsonData = {
        'date': '2021-10-27T07:49:14.896Z',
        'hasError': false,
        'fields': [
            {
                'id': '4c212130',
                'prop': 'iban',
                'value': 'DE81200505501265402568',
                'hasError': false,
            },
        ],
    };

    test('renders', () => {
        render(
            <JSONViewer
                jsonData={jsonData}
                onChangePath={vi.fn()}
            />,
        );

        expect(screen.getByText('\'DE81200505501265402568\'')).toBeInTheDocument();
    });

    test('calls onChangePath correctly', async () => {
        const onChangePath = vi.fn();
        render(
            <JSONViewer
                jsonData={jsonData}
                onChangePath={onChangePath}
            />,
        );

        const propLink = screen.getByText('prop');
        await userEvent.click(propLink);

        expect(onChangePath).toHaveBeenCalledWith('res.fields[0].prop');
    });

    test('ignores clicking on iterable property name', async () => {
        const onChangePath = vi.fn();
        render(
            <JSONViewer
                jsonData={jsonData}
                onChangePath={onChangePath}
            />,
        );

        const propLink = screen.getByText('fields');
        await userEvent.click(propLink);

        expect(onChangePath).not.toHaveBeenCalled();
    });
});