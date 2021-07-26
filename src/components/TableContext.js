import React, {useState, createContext} from 'react'

export const TableContext = createContext();

export const TableProvider = props => {
    const [getState, setState] = useState({
        data: [
            {
                id: 0,
                name: "Bug Destroyer",
                availableVolumes: [
                    {
                        liters: 1,
                        priceRub: 99.90
                    },
                    {
                        liters: 3,
                        priceRub: 249.90
                    },
                    {
                        liters: 5,
                        priceRub: 399.90
                    }
                ],
                categories: ["anti bug"]
            },
            {
                id: 1,
                name: "Super Food",
                availableVolumes: [
                    {
                        liters: 3,
                        priceRub: 349.90
                    },
                    {
                        liters: 5,
                        priceRub: 499.90
                    }
                ],
                categories: ["growth stimulator"]
            }
        ],
        pages: 3
    })

    return (
        <TableContext.Provider value={[getState, setState]}>
            {props.children}
        </TableContext.Provider>
    )
}
