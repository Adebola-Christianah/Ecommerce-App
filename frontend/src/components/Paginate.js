import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (pages > 1 && (
        <Pagination className="flex justify-center my-4">
            <Pagination.First className={`${page === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`} disabled={page === 1} />
            <Pagination.Prev className={`${page === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`} disabled={page === 1} />
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                        `/?keyword=${keyword}&page=${x + 1}`
                        : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                    }
                >
                    <Pagination.Item 
                        className={`border border-gray-300 mx-1 rounded-md py-1 px-3 ${x + 1 === page ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`} 
                        active={x + 1 === page}
                    >
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
            <Pagination.Next className={`${page === pages ? 'text-gray-400 cursor-not-allowed' : ''}`} disabled={page === pages} />
            <Pagination.Last className={`${page === pages ? 'text-gray-400 cursor-not-allowed' : ''}`} disabled={page === pages} />
        </Pagination>
    ))
}

export default Paginate
