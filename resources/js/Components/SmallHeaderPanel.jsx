import CategoryButton from "@/Components/CategoryButton.jsx";

export default function SmallHeaderPanel({children}) {
    return (
        <div className={'bg-gray-300 mb-2 overflow-x-clip'}>
            <div className={'flex bg-white shadow-md rounded px-8 py-6 space-x-2'}>
                {children}
            </div>
        </div>
    )
}
