// IMPORTS
import React from 'react'

// __MAIN__
function CardCreator({array_of_IDs, maxPerPage, currentPage, component: Component}) {
    console.log(maxPerPage)
    console.log(currentPage)
    return (
        array_of_IDs.map((id, idx) => {
            return (
                <Component 
                    key={id} id={id}
                    idx={(maxPerPage * (currentPage - 1)) + idx + 1}
                /> 
            )
        })
    )
}

// EXPORT
export default CardCreator