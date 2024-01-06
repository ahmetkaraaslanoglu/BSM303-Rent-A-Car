export function Input({label,value, setValue}) {
    return (
        <div className="flex space-y-1 flex-col w-full">
            <label>{label}</label>
            <input
                type="text"
                className="h-8 rounded-md border border-gray-500 p-2 focus:outline-0"
                value={value}
                onChange={setValue}
            />
        </div>
    );
}
