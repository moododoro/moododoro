interface DurationInputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.SubmitEventHandler<HTMLFormElement>;
    label: string;
    value: number;
}
const DurationInput = ({
    onChange,
    onSubmit,
    label,
    value = 0,
}: DurationInputProps) => {
    return (
        <form onSubmit={onSubmit} className="p-2">
            <p>{label}</p>
            <input
                className="border m-1 p-1 rounded shadow-sm"
                value={value}
                onChange={onChange}
                type="number"
            />
            <button className="border m-1 p-1 hover:cursor-pointer hover:bg-[#cfcbc4] rounded shadow-sm">
                Submit
            </button>
        </form>
    );
};

export default DurationInput;
