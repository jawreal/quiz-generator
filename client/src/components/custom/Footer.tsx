const date = new Date()
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="w-full py-10 flex flex-col items-center border-t border-gray-300 dark:border-gray-800">
      <span className="text-gray-500 dark:text-gray-400 text-sm">&copy; {year} NEUROQUIZ. All rights reserved.</span>
    </div>
  );
};

export default Footer;