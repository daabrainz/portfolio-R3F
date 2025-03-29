export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  const isMobile = window.innerWidth < 768;
  const isVerySmallDevice = window.innerWidth < 375;

  return (
    <>
      <button
        onClick={() => {
          setMenuOpened(!menuOpened);
        }}
        className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
      >
        <div
          className={`h-0.5 bg-white rounded-md w-full transition-all ${
            menuOpened ? "translate-y-0.5 rotate-45" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col z-10 ${
          menuOpened ? "w-full md:w-80" : "w-0"
        }`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
            <MenuButton label="About me" onClick={() => onSectionChange(0)} />
            <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
            <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
            <MenuButton label="My Life" onClick={() => onSectionChange(3)} />
            <MenuButton label="Contact" onClick={() => onSectionChange(isVerySmallDevice ? 6 : 5)} />
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
    const { label, onClick } = props;

    return (
        <button onClick={onClick} className="text-2xl text-gray-900 font-bold cursor-pointer hover:text-indigo-600 transition-colors">{label}
        </button>
    );
};
