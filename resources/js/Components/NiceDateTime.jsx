export default function NiceDateTime({dateString}) {
    const formatPostDate = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 172800) {
            return 'Yesterday';
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return postDate.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: now.getFullYear() === postDate.getFullYear() ? undefined : 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    }

    return (
        <>
        {formatPostDate(dateString)}
        </>
    )
}
