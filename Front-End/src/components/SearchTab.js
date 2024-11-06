import { useState, useEffect } from 'react';

const SearchTab = ({ closeSearch }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Handle input change
    const handleSearchChange = async (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);

        // If the query is not empty, fetch results from the database
        if (searchQuery.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/posts?q=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data); // Set the fetched data as search results
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]); // Clear results if query is empty
        }
    };

    return (
        <div className="fixed   top-[110px] shadow-lg   rounded right-[200px]  z-50 flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded w-96">
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Search for products..."
                    />
                    <button onClick={closeSearch} className="ml-4 text-gray-600 hover:text-gray-900">X</button>
                </div>

                {query && searchResults.length > 0 && (
                    <div className="mt-4">
                        <h2 className="font-semibold">Search Results:</h2>
                        <ul>
                            {searchResults.map((product) => (
                                <li key={product._id} className="mt-2 p-2 border-b">
                                    <a href={`/product/${product._id}`} className="text-blue-600 hover:underline">
                                        {product.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {query && searchResults.length === 0 && (
                    <div className="mt-4 text-gray-500">No results found.</div>
                )}
            </div>
        </div>
    );
};

export default SearchTab;
