 const   Loader=({imageLoader})=> {
return (
<div className={`flex flex-col items-center justify-center ${imageLoader?"h-[200px]":"h-[screen]"}  gap-4 bg-gray-50`}>
<div className="w-16 h-16 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
</div>
);
}
export default Loader;