import { ChangeEvent, FC, MouseEvent, useMemo, useState } from 'react';

import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { SearchAll } from '../types/types';

type SearchContainerProps = {};

const SearchContainer: FC<SearchContainerProps> = () => {
    const [localSearch, setLocalSearch] = useState('');
    const {
        isLoading,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
    } = useAppContext();

    const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        handleChange(name, value);
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLocalSearch('');
        clearFilters();
    };

    const debounce = () => {
        let timeoutID: NodeJS.Timeout;
        return (e: ChangeEvent<HTMLInputElement>) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                const name = e.target.name;
                const value = e.target.value;
                handleChange(name, value);
            }, 1000);
        };
    };

    const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={localSearch}
                        handleChange={optimizedDebounce}
                    />
                    <FormRowSelect
                        labelText="job status"
                        name="searchStatus"
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={[...Object.values(SearchAll), ...Object.values(statusOptions)]}
                    />
                    {/* search by type */}

                    <FormRowSelect
                        labelText="job type"
                        name="searchType"
                        value={searchType}
                        handleChange={handleSearch}
                        list={[...Object.values(SearchAll), ...Object.values(jobTypeOptions)]}
                    />
                    {/* sort */}

                    <FormRowSelect
                        name="sort"
                        value={sort}
                        handleChange={handleSearch}
                        list={Object.values(sortOptions)}
                    />
                    <button
                        className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;
