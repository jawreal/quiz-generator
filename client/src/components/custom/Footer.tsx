const date = new Date()
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="w-full py-10 flex flex-col items-center border-t border-zinc-300 dark:border-zinc-800">
      <span className="text-zinc-500 dark:text-zinc-400 text-sm">&copy; {year} NEUROQUIZ. All rights reserved.</span>
    </div>
  );
};

export default Footer;