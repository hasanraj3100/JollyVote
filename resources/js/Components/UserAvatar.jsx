export default function UserAvatar({name, size=12}) {
    const nameParts = name.trim().split(" ");

    let initials =
        nameParts.length === 1 ?
            nameParts[0][0]
            :
            nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();

    return (
        <div
            className={`min-w-${size} h-${size} mr-4 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold`}>
            {initials}
        </div>
    )
}
