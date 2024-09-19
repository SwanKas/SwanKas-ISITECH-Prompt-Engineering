import { ChangeEventHandler, FC } from "react";
import { SearchInput } from "./SeaerchInputComp.tsx";

type IProps = {
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  searchValue: string;
  onSendMessage: () => void;
};

const Navbar: FC<IProps> = (props) => {
  const { searchValue, onSearchChange, onSendMessage } = props;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  return (
    <div className="fixed bottom-0 bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 w-full flex justify-between items-center p-4 shadow-lg text-gray-100">
      <div className="basis-1/2 flex justify-center items-center">
        <SearchInput
          value={searchValue}
          onClick={onSendMessage}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export { Navbar };
