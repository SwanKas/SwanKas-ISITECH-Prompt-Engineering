import { ChangeEventHandler, FC, KeyboardEventHandler } from "react";
import { Button } from "./ButtonComp.tsx";

type SearchInputProps = {
  onClick: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  value: string;
};

const SearchInput: FC<SearchInputProps> = ({ onChange, value, onClick, onKeyDown }) => {
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (inputEvent) => {
    if (inputEvent.key === "Enter") {
      onClick();
    }
    if (onKeyDown) {
      onKeyDown(inputEvent);
    }
  };

  return (
    <div className="relative flex w-full">
      <input
        type="search"
        className="peer block min-h-[auto] w-full rounded-xl px-3 py-[0.32rem] leading-[1.6] text-black focus:outline focus:outline-green-500"
        placeholder="Talk with My Super IA Assistant"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyPress}
      />
      <div className="basis-1/2 flex justify-center items-center">
        <Button
          className="bg-green-400 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300 border border-stone-800 w-1/2"
          label="Send"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export { SearchInput };
