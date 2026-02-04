import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) return null;

  // Determine if it's an error based on the text
  const isError =
    message.toLowerCase().includes("error") ||
    message.toLowerCase().includes("fail");

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`
        flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-l-4
        ${
          isError
            ? "bg-red-50 border-red-500 text-red-800 shadow-red-100"
            : "bg-white border-blue-500 text-gray-800 shadow-blue-100"
        }
      `}
      >
        {/* Dynamic Icon */}
        <div
          className={`p-2 rounded-full ${isError ? "bg-red-100" : "bg-blue-50"}`}
        >
          {isError ? (
            <span className="text-red-600 font-bold">!</span>
          ) : (
            <span className="text-blue-600">✓</span>
          )}
        </div>

        <p className="font-semibold text-sm sm:text-base">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
