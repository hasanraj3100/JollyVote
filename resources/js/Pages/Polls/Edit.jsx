import {Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Edit({ poll }) {


    const {data, setData, patch, processing, errors} = useForm({
        pollTitle: poll.title,
        options: poll.options,
        privacy: poll.public ? "public" : "private"
    });

    const handlePollTitleChange = (e) => {
        setData("pollTitle", e.target.value);
    };

    const handleOptionChange = (id, newValue) => {
        const old = [...data.options];
        const updated = old.map(option => option.id === id?
            {...option, title: newValue} : option);
        setData('options', updated);
    };

    const addOption = () => {
        setData("options", [...data.options, {title:""}]);
    };

    const removeOption = (id) => {
        const old = [...data.options];
        const upd = old.filter((option) => option.id !== id);
        setData("options", upd);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Poll Title:", data.pollTitle);
        console.log("Options:", data.options.filter((option) => option.title.trim() !== ""));
        // Add your submit logic here
        patch(`/polls/${poll.id}`);
    };


    const handlePrivacyChange = (e) => {
        setData("privacy", e.target.value);
    }

    return (

        <AuthenticatedLayout>
            <Head title="Create New Poll"/>

            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a Poll</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Poll Title */}
                        <div className="mb-4">
                            <label
                                htmlFor="poll-title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Poll Title
                            </label>
                            <input
                                id="poll-title"
                                type="text"
                                value={data.pollTitle}
                                onChange={handlePollTitleChange}
                                placeholder="Enter your poll title"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                required
                            />
                            {errors.pollTitle && <div>{errors.pollTitle}</div>}
                        </div>

                        {/* Options */}
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Options</h2>
                            {data.options.map((option, index) => (
                                <div key={option.id}>

                                    <div className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={option.title}
                                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                            placeholder={`Option ${index + 1}`}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
                                        />


                                        {data.options.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeOption(option.id)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}



                                    </div>
                                    {errors[`options.${index}.title`] &&  <div className="block">{errors[`options.${index}.title`]}</div>}

                                </div>


                            ))}


                            <button
                                type="button"
                                onClick={addOption}
                                className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Option
                            </button>

                            {errors.options && <p>{errors.options}</p>}
                        </div>

                        {/* Privacy Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Audience</label>
                            <fieldset className="mt-2">
                                <legend className="sr-only">Privacy options</legend>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            id="privacy-public"
                                            name="privacy"
                                            type="radio"
                                            value="public"
                                            checked={data.privacy === "public"}
                                            onChange={handlePrivacyChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="privacy-public" className="ml-2 block text-sm text-gray-700">
                                            Public
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="privacy-private"
                                            name="privacy"
                                            type="radio"
                                            value="private"
                                            checked={data.privacy === "private"}
                                            onChange={handlePrivacyChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="privacy-private" className="ml-2 block text-sm text-gray-700">
                                            Private
                                        </label>
                                    </div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Private polls are accessible only via direct link, while public polls appear in users' feeds.                            </p>
                            </fieldset>
                            {errors.privacy && <div className="text-red-500">{errors.privacy}</div>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Poll
                        </button>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
