const LoadingSpinner = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      <span className="text-sm text-gray-500">Sending ...</span>
    </div>
  );
};

export default LoadingSpinner;
