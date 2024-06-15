import {describe, expect, test, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JSONPropertyInput from './JSONPropertyInput';

describe('JSONPropertyInput', () => {
    const jsonData = {
        deep: {
            string: 'ABCD',
        },
    };

    test('renders', () => {
        render(
            <JSONPropertyInput
                path="res.deep.string"
                jsonData={jsonData}
                onChange={vi.fn()}
            />,
        );

        expect(screen.getByText('Property')).toBeInTheDocument();
    });
    test('calls onChange when input changes', async () => {
        const onChange = vi.fn();
        render(
            <JSONPropertyInput
                path="res.deep.string"
                jsonData={jsonData}
                onChange={onChange}
            />,
        );

        const input = screen.getByLabelText('Property');
        await userEvent.type(input, 'abcd');

        expect(onChange).toHaveBeenCalled();
    });
    test('displays preview value', () => {
        render(
            <JSONPropertyInput
                path="res.deep.string"
                jsonData={jsonData}
                onChange={vi.fn()}
            />,
        );

        expect(screen.getByText('ABCD')).toBeInTheDocument();
    });
});