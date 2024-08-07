import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SubPage() {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await axios.get(`/api/auth/pagedata/${slug}`);
                setPageData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching page data:', error.message);
                setError('Failed to fetch page data');
                setLoading(false);
            }
        };

        fetchPageData();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pageData) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h1>{pageData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
            {/* Render other page data fields as needed */}
        </div>
    );
}

export default SubPage;