import { Menu } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface IMenuItem {
    label: string,
    key: string
}

interface IItemClickedProps {
    key: string
}

export const AppMenu = () => {
    const navigate = useNavigate();
    
    const items: IMenuItem[] = [
        { label: 'Search', key: '' },
        { label: 'Locations', key: 'locations' },
        { label: 'Tags', key: 'tags' },
        { label: 'Groups', key: 'groups' },
        { label: 'Settings', key: 'settings', },
    ]

    const onItemClicked = useCallback(({key}: IItemClickedProps) => {
        navigate(`/${key}`)
    }, [ navigate ])

    return (
        <Menu items={items} onClick={onItemClicked} />
    )
}