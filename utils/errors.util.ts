import { IError, IIndexedError } from '../models/errors.model';

export const getErrors = (index: number, errors: IIndexedError[]): IError | undefined => {
    const error = errors.find(f => f.index === index);
    if (error) {
        return { error: error.message };
    }
    return undefined;
}