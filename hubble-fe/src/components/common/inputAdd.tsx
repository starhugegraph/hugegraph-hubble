import React from 'react'
import { Input, Button } from 'antd'

type Props = {
    setSearch: (params: String) => void,
    createHandle: () => void,
    placeholder: string,
    children: string
}

function InputAdd({ setSearch, createHandle, placeholder, children }: Props) {
    return (
        <>
            <Input.Group compact className='inputBox'>
                <Input.Search
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={placeholder}
                    onSearch={(params) => setSearch(params)}
                />
            </Input.Group>
            <Button onClick={createHandle}
                type="primary"
                className='query_list_addButton'
            >
                {children}
            </Button>
        </>
    )
}
export default React.memo(InputAdd)