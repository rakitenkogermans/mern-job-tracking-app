import { ChangeEvent, FC, MouseEvent } from 'react';

import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { SearchAll } from '../types/types';

type SearchContainerProps = {};

const SearchContainer: FC<SearchContainerProps> = () => {
    const {
        isLoading,
        search,
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
        if (isLoading) return;
        const name = e.target.name;
        const value = e.target.value;
        handleChange(name, value);
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        clearFilters();
    };

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                <div className="form-center">
                    <FormRow type="text" name="search" value={search} handleChange={handleSearch} />
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
